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
import { useQuery } from "@apollo/client";
import { Close } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";

import { Hall, Movie } from "../../types/types";
import { useAppDispatch } from "../../hooks";
import { GET_ALL_HALLS, GET_ALL_MOVIES } from "../../utils/gql";
import { openSnackbar } from "../../redux/loading/loading.slice";

import LoadingButton from "../loading-button/loading-button.component";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreateCallback: () => void;
};

const SessionPopulateModal: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();

  const defaultValues = {
    movieId: "",
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: defaultValues,
  });

  const [sessions, setSessions] = useState("");
  const [halls, setHalls] = useState<Hall[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [selectedMovieInputValue, setSelectedMovieInputValue] = useState("");

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

  const onSubmit = async (values: any, e: any) => {
    e.preventDefault();
    const sessions = [];
    const hallIds = halls.map((h) => h.id);
    const timeDiffs = [86400, 172800];
    const movieId = movies.find((m) => m.name === values?.movieId)?.id ?? "";
    for (let index = 0; index < timeDiffs.length; index++) {
      const timeDiff = timeDiffs[index];
      for (let j = 0; j < hallIds.length; j++) {
        const hallId = hallIds[j];
        for (let i = 0; i < 5; i++) {
          const session = {
            datetime:
              new Date(new Date().setHours(i + 12, 0, 0, 0))?.getTime() / 1000 +
              timeDiff,
            hallId: hallId,
            movieId: movieId,
            adultRate: 100,
            studentRate: 75,
            childRate: 50,
          };
          sessions.push(session);
        }
      }
    }
    console.log('SESSIONS:\n', sessions.length);
    setSessions(JSON.stringify(sessions, null, 2));
  };

  useEffect(() => {
    setMovies(moviesData?.getAllMovies);
  }, [moviesData]);

  useEffect(() => {
    setHalls(hallsData?.getAllHalls);
  }, [hallsData]);

  useEffect(() => {
    setSessions("");
  }, []);

  useEffect(() => {
    setSelectedMovie(null);
    setSelectedMovieInputValue("");
  }, [open]);

  const handleCopy = async () => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(sessions);
    } else {
      document.execCommand("copy", true, sessions);
    }
    dispatch(
      openSnackbar({
        severity: "success",
        message: "Population data is copied!",
      })
    );
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Populate Sessions
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ width: 400 }}>
        {sessions ? (
          <Box>
            <Button onClick={handleCopy}>Copy data</Button>
          </Box>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            id="session-populate-form"
          >
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
          </Box>
        )}
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: 16,
          }}
        >
          <Button color="secondary" size="large" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            size="large"
            form="session-populate-form"
            pending={isMoviesLoading || isHallsLoading}
          >
            Submit
          </LoadingButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SessionPopulateModal;
