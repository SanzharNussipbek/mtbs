import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  TextField,
  Box,
  Autocomplete,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";

import { useAppDispatch } from "../../hooks";
import { Hall, Movie, Session } from "../../types/types";
import { GET_ALL_HALLS } from "../../utils/gql/hall";
import { GET_ALL_MOVIES } from "../../utils/gql/movie";
import { CREATE_SESSION, UPDATE_SESSION } from "../../utils/gql/session";
import { openSnackbar } from "../../redux/loading/loading.slice";

import LoadingButton from "../loading-button/loading-button.component";

type Props = {
  data: Session | null;
  open: boolean;
  onClose: () => void;
};

const SessionEditModal: React.FC<Props> = ({ data, open, onClose }) => {
  const dispatch = useAppDispatch();

  const defaultValues = {
    datetime: 0,
    hallId: "",
    movieId: "",
    adultRate: 0,
    studentRate: 0,
    childRate: 0,
  };

  const [values, setValues] = useState({
    id: data?.id?.length ? data?.id : "",
    hallId: data?.hall?.id?.length ? data?.hall?.id : "",
    movieId: data?.movie?.id?.length ? data?.movie?.id : "",
    datetime: data?.datetime ?? null,
    adultRate: data?.rates?.ADULT ?? 0,
    studentRate: data?.rates?.STUDENT ?? 0,
    childRate: data?.rates?.CHILD ?? 0,
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: defaultValues,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedHall, setSelectedHall] = useState<string | null>(
    data?.hall?.name?.length ? data?.hall?.name : ""
  );
  const [selectedHallInputValue, setSelectedHallInputValue] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<string | null>(
    data?.movie?.name?.length ? data?.movie?.name : ""
  );
  const [selectedMovieInputValue, setSelectedMovieInputValue] = useState("");
  const [selectedDatetime, setSelectedDatetime] = useState(
    data?.datetime ? new Date(data?.datetime * 1000) : null
  );

  const { data: moviesData, loading: isMoviesLoading } = useQuery(
    GET_ALL_MOVIES,
    {
      onError(err) {
        dispatch(
          openSnackbar({
            message: "Error while fetching movies list. See the logs.",
            severity: "error",
          })
        );
        console.error(JSON.stringify(err, null, 2));
      },
    }
  );

  const { data: hallsData, loading: isHallsLoading } = useQuery(GET_ALL_HALLS, {
    onError(err) {
      dispatch(
        openSnackbar({
          message: "Error while fetching halls list. See the logs.",
          severity: "error",
        })
      );
      console.error(JSON.stringify(err, null, 2));
    },
  });

  const [updateSession] = useMutation(UPDATE_SESSION, {
    update(_, { data }) {
      setIsLoading(false);
      onClose();
      dispatch(
        openSnackbar({
          message: "Session updated successfully!",
          severity: "success",
        })
      );
    },
    onError(err) {
      setIsLoading(false);
      dispatch(
        openSnackbar({
          message: "Error while updating the session. See the logs.",
          severity: "error",
        })
      );
      console.error(JSON.stringify(err, null, 2));
    },
  });

  const onSubmit = async (_: any, e: any) => {
    e.preventDefault();
    setIsLoading(true);
    updateSession({ variables: values });
  };

  useEffect(() => {
    setValues({
      id: data?.id?.length ? data?.id : "",
      hallId: data?.hall?.id?.length ? data?.hall?.id : "",
      movieId: data?.movie?.id?.length ? data?.movie?.id : "",
      datetime: data?.datetime ?? null,
      adultRate: data?.rates?.ADULT ?? 0,
      studentRate: data?.rates?.STUDENT ?? 0,
      childRate: data?.rates?.CHILD ?? 0,
    });
    setSelectedHall(data?.hall?.name?.length ? data?.hall?.name : "");
    setSelectedMovie(data?.movie?.name?.length ? data?.movie?.name : "");
    setSelectedDatetime(
      data?.datetime ? new Date(data?.datetime * 1000) : null
    );
  }, [data]);

  useEffect(() => {
    setHalls(hallsData?.getAllHalls);
  }, [hallsData]);

  useEffect(() => {
    setMovies(moviesData?.getAllMovies);
  }, [moviesData]);

  return (
    <Dialog open={open}>
      <DialogTitle
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Edit Session
        <IconButton onClick={onClose} disabled={isLoading}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ width: 400 }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          id="session-create-form"
        >
          <Controller
            name="hallId"
            control={control}
            render={({ ...props }) => (
              <Autocomplete
                {...props}
                fullWidth
                loading={isHallsLoading}
                value={selectedHall}
                onChange={(event: any, newValue: string | null) => {
                  setSelectedHall(newValue);
                  setValues({
                    ...values,
                    hallId:
                      halls?.find((h) => h.name === newValue)?.id ??
                      values?.hallId,
                  });
                  props?.field?.onChange(event);
                }}
                inputValue={selectedHallInputValue}
                onInputChange={(event, newInputValue) => {
                  setSelectedHallInputValue(newInputValue);
                }}
                options={halls?.map((h) => h.name)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    autoFocus
                    label="Hall"
                    margin="normal"
                    error={!!errors.hallId}
                    helperText={errors.hallId && errors.hallId.message}
                  />
                )}
              />
            )}
          />
          <Controller
            name="movieId"
            control={control}
            render={({ ...props }) => (
              <Autocomplete
                {...props}
                fullWidth
                loading={isMoviesLoading}
                value={selectedMovie}
                onChange={(event: any, newValue: string | null) => {
                  setSelectedMovie(newValue);
                  setValues({
                    ...values,
                    movieId:
                      movies?.find((m) => m.name === newValue)?.id ??
                      values?.movieId,
                  });
                  props?.field?.onChange(newValue);
                }}
                inputValue={selectedMovieInputValue}
                onInputChange={(event, newInputValue) => {
                  setSelectedMovieInputValue(newInputValue);
                }}
                options={movies?.map((m) => m.name)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Movie"
                    margin="normal"
                    error={!!errors.movieId}
                    helperText={errors.movieId && errors.movieId.message}
                  />
                )}
              />
            )}
          />
          <Controller
            name="datetime"
            control={control}
            render={({ ...props }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Date & Time"
                  value={selectedDatetime}
                  onChange={(newValue) => {
                    if (!newValue || isNaN(newValue?.getTime())) return;
                    setSelectedDatetime(newValue);
                    setValues({
                      ...values,
                      datetime: newValue?.getTime() / 1000,
                    });
                    props?.field?.onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      margin="normal"
                      error={!!errors.datetime}
                      helperText={errors.datetime && errors.datetime.message}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            name="adultRate"
            control={control}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                type="number"
                id="adultRate"
                name="adultRate"
                label="Adult price"
                autoComplete="adultRate"
                error={!!errors.adultRate}
                helperText={errors.adultRate && errors.adultRate.message}
                value={values?.adultRate}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({
                    ...values,
                    adultRate: +e.target.value,
                  });
                }}
              />
            )}
          />
          <Controller
            name="studentRate"
            control={control}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                type="number"
                id="studentRate"
                name="studentRate"
                label="Student price"
                autoComplete="studentRate"
                error={!!errors.studentRate}
                helperText={errors.studentRate && errors.studentRate.message}
                value={values?.studentRate}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({
                    ...values,
                    studentRate: +e.target.value,
                  });
                }}
              />
            )}
          />
          <Controller
            name="childRate"
            control={control}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                type="number"
                id="childRate"
                name="childRate"
                label="Child price"
                autoComplete="childRate"
                error={!!errors.childRate}
                helperText={errors.childRate && errors.childRate.message}
                value={values?.childRate}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({
                    ...values,
                    childRate: +e.target.value,
                  });
                }}
              />
            )}
          />
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: 16,
          }}
        >
          <Button
            color="secondary"
            size="large"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            size="large"
            pending={isLoading}
            form="session-create-form"
          >
            Submit
          </LoadingButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SessionEditModal;
