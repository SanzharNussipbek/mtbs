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
import { Hall, Movie } from "../../types/types";
import { GET_ALL_HALLS } from "../../utils/gql/hall";
import { GET_ALL_MOVIES } from "../../utils/gql/movie";
import { CREATE_SESSION } from "../../utils/gql/session";
import { openSnackbar } from "../../redux/loading/loading.slice";

import LoadingButton from "../loading-button/loading-button.component";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreateCallback: () => void;
};

const SessionCreateModal: React.FC<Props> = ({
  open,
  onClose,
  onCreateCallback,
}) => {
  const dispatch = useAppDispatch();

  const defaultValues = {
    datetime: 0,
    hallId: "",
    movieId: "",
    adultRate: 0,
    studentRate: 0,
    childRate: 0,
  };

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
  const [selectedHall, setSelectedHall] = useState<string | null>(null);
  const [selectedHallInputValue, setSelectedHallInputValue] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [selectedMovieInputValue, setSelectedMovieInputValue] = useState("");
  const [selectedDatetime, setSelectedDatetime] = useState(null);

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

  const [createSession] = useMutation(CREATE_SESSION, {
    update(_, { data }) {
      setIsLoading(false);
      onCreateCallback();
      onClose();
      dispatch(
        openSnackbar({
          message: "Session created successfully!",
          severity: "success",
        })
      );
    },
    onError(err) {
      setIsLoading(false);
      dispatch(
        openSnackbar({
          message: "Error while creating the session. See the logs.",
          severity: "error",
        })
      );
      console.error(JSON.stringify(err, null, 2));
    },
    variables: defaultValues,
  });

  const onSubmit = async (values: any, e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      datetime: new Date(values?.datetime)?.getTime() / 1000,
      movieId: movies.find((m) => m.name === values?.movieId)?.id ?? "",
      hallId: halls.find((h) => h.name === values?.hallId)?.id ?? "",
      adultRate: parseInt(values?.adultRate),
      studentRate: parseInt(values?.studentRate),
      childRate: parseInt(values?.childRate),
    };
    createSession({ variables: data });
  };

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
        Create Session
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
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <Autocomplete
                {...props}
                fullWidth
                loading={isHallsLoading}
                value={selectedHall}
                onChange={(event: any, newValue: string | null) => {
                  setSelectedHall(newValue);
                  props?.field?.onChange(newValue);
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
                    required
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
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <Autocomplete
                {...props}
                fullWidth
                loading={isMoviesLoading}
                value={selectedMovie}
                onChange={(event: any, newValue: string | null) => {
                  setSelectedMovie(newValue);
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
                    required
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
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Date & Time"
                  value={selectedDatetime}
                  onChange={(newValue) => {
                    setSelectedDatetime(newValue);
                    props?.field?.onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      required
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
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                required
                fullWidth
                type="number"
                id="adultRate"
                name="adultRate"
                label="Adult price"
                autoComplete="adultRate"
                error={!!errors.adultRate}
                helperText={errors.adultRate && errors.adultRate.message}
                onChange={(value) => {
                  props?.field?.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="studentRate"
            control={control}
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                required
                fullWidth
                type="number"
                id="studentRate"
                name="studentRate"
                label="Student price"
                autoComplete="studentRate"
                error={!!errors.studentRate}
                helperText={errors.studentRate && errors.studentRate.message}
                onChange={(value) => {
                  props?.field?.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="childRate"
            control={control}
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                required
                fullWidth
                type="number"
                id="childRate"
                name="childRate"
                label="Child price"
                autoComplete="childRate"
                error={!!errors.childRate}
                helperText={errors.childRate && errors.childRate.message}
                onChange={(value) => {
                  props?.field?.onChange(value);
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

export default SessionCreateModal;
