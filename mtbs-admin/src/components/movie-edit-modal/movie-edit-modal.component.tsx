import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { format } from "date-fns";

import { Movie } from "../../types/types";
import { useAppDispatch } from "../../hooks";
import { UPDATE_MOVIE } from "../../utils/gql/movie";
import { openSnackbar } from "../../redux/loading/loading.slice";

import LoadingButton from "../loading-button/loading-button.component";

type Props = {
  data: Movie | null;
  open: boolean;
  onClose: () => void;
};

const MovieEditModal: React.FC<Props> = ({ data, open, onClose }) => {
  const dispatch = useAppDispatch();

  const [values, setValues] = useState({
    id: data?.id?.length ? data?.id : "",
    name: data?.name?.length ? data?.name : "",
    description: data?.description?.length ? data?.description : "",
    duration: data?.duration ? +data?.duration : null,
    language: data?.language?.length ? data?.language : "",
    releaseDate: data?.releaseDate?.length ? data?.releaseDate : null,
    country: data?.country?.length ? data?.country : "",
    genre: data?.genre?.length ? data?.genre : "",
    director: data?.director?.length ? data?.director : "",
    cast: data?.cast?.length ? data?.cast : "",
    rating: data?.rating?.length ? data?.rating : "",
    imgUrl: data?.imgUrl?.length ? data?.imgUrl : "",
    trailerUrl: data?.trailerUrl?.length ? data?.trailerUrl : "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    values?.releaseDate?.length ? new Date(values?.releaseDate) : null
  );

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: values,
  });

  const [updateMovie] = useMutation(UPDATE_MOVIE, {
    update(_, { data }) {
      setIsLoading(false);
      onClose();
      dispatch(
        openSnackbar({
          message: "Movie updated successfully!",
          severity: "success",
        })
      );
    },
    onError(err) {
      setIsLoading(false);
      dispatch(
        openSnackbar({
          message: "Error while updating the movie. See the logs.",
          severity: "error",
        })
      );
      console.error(JSON.stringify(err, null, 2));
    },
    variables: values,
  });

  const onSubmit = async (v: any, e: any) => {
    e.preventDefault();
    setIsLoading(true);
    updateMovie({ variables: values });
  };

  useEffect(() => {
    setValues({
      id: data?.id?.length ? data?.id : "",
      name: data?.name?.length ? data?.name : "",
      description: data?.description?.length ? data?.description : "",
      duration: data?.duration ? +data?.duration : null,
      language: data?.language?.length ? data?.language : "",
      releaseDate: data?.releaseDate?.length ? data?.releaseDate : null,
      country: data?.country?.length ? data?.country : "",
      genre: data?.genre?.length ? data?.genre : "",
      director: data?.director?.length ? data?.director : "",
      cast: data?.cast?.length ? data?.cast : "",
      rating: data?.rating?.length ? data?.rating : "",
      imgUrl: data?.imgUrl?.length ? data?.imgUrl : "",
      trailerUrl: data?.trailerUrl?.length ? data?.trailerUrl : "",
    });
    setSelectedDate(
      data?.releaseDate?.length ? new Date(data?.releaseDate) : null
    );
  }, [data]);

  useEffect(() => {
    if (!selectedDate) return;
    setValues({
      ...values,
      releaseDate: format(selectedDate, "dd-MMM-yyyy"),
    });
  }, [selectedDate]);

  return (
    <Dialog open={open}>
      <DialogTitle
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Update Movie
        <IconButton onClick={onClose} disabled={isLoading}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          id="movie-edit-form"
        >
          <Controller
            name="name"
            control={control}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                error={!!errors.name}
                helperText={errors.name && errors.name.message}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({ ...values, name: e.target.value });
                }}
                value={values?.name}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                multiline
                rows={4}
                maxRows={4}
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                error={!!errors.description}
                helperText={errors.description && errors.description.message}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({ ...values, description: e.target.value });
                }}
                value={values?.description}
              />
            )}
          />
          <Controller
            name="duration"
            control={control}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                id="duration"
                type="number"
                label="Duration"
                name="duration"
                placeholder="Duration in minutes"
                autoComplete="duration"
                error={!!errors.duration}
                helperText={errors.duration && errors.duration.message}
                onChange={(e) => {
                  props?.field?.onChange(+e.target.value);
                  setValues({ ...values, duration: +e.target.value });
                }}
                value={values?.duration}
              />
            )}
          />
          <Controller
            name="language"
            control={control}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                id="language"
                type="language"
                label="Language"
                name="language"
                autoComplete="language"
                error={!!errors.language}
                helperText={errors.language && errors.language.message}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({ ...values, language: e.target.value });
                }}
                value={values?.language}
              />
            )}
          />
          <Controller
            name="releaseDate"
            control={control}
            render={({ ...props }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Release Date"
                  value={selectedDate}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                    if (!newValue) {
                      props?.field?.onChange(null);
                    } else {
                      props?.field?.onChange(
                        format(new Date(newValue), "dd-MMM-yyyy")
                      );
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      margin="normal"
                      error={!!errors.releaseDate}
                      helperText={
                        errors.releaseDate && errors.releaseDate.message
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            name="country"
            control={control}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                id="country"
                label="Country"
                name="country"
                autoComplete="country"
                error={!!errors.country}
                helperText={errors.country && errors.country.message}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({ ...values, country: e.target.value });
                }}
                value={values?.country}
              />
            )}
          />
          <Controller
            name="genre"
            control={control}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                id="genre"
                label="Genre"
                name="genre"
                autoComplete="genre"
                error={!!errors.genre}
                helperText={errors.genre && errors.genre.message}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({ ...values, genre: e.target.value });
                }}
                value={values?.genre}
              />
            )}
          />
          <Controller
            name="director"
            control={control}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                id="director"
                label="Director"
                name="director"
                autoComplete="director"
                error={!!errors.director}
                helperText={errors.director && errors.director.message}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({ ...values, director: e.target.value });
                }}
                value={values?.director}
              />
            )}
          />
          <Controller
            name="cast"
            control={control}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                id="cast"
                label="Cast"
                name="cast"
                autoComplete="cast"
                error={!!errors.cast}
                helperText={errors.cast && errors.cast.message}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({ ...values, cast: e.target.value });
                }}
                value={values?.cast}
              />
            )}
          />
          <Controller
            name="rating"
            control={control}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                id="rating"
                label="Rating"
                name="rating"
                autoComplete="rating"
                error={!!errors.rating}
                helperText={errors.rating && errors.rating.message}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({ ...values, rating: e.target.value });
                }}
                value={values?.rating}
              />
            )}
          />
          <Controller
            name="imgUrl"
            control={control}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                id="imgUrl"
                type="url"
                label="Poster URL"
                name="imgUrl"
                autoComplete="imgUrl"
                error={!!errors.imgUrl}
                helperText={errors.imgUrl && errors.imgUrl.message}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({ ...values, imgUrl: e.target.value });
                }}
                value={values?.imgUrl}
              />
            )}
          />
          <Controller
            name="trailerUrl"
            control={control}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                id="trailerUrl"
                type="url"
                label="Trailer URL"
                name="trailerUrl"
                autoComplete="trailerUrl"
                error={!!errors.trailerUrl}
                helperText={errors.trailerUrl && errors.trailerUrl.message}
                onChange={(e) => {
                  props?.field?.onChange(e);
                  setValues({ ...values, trailerUrl: e.target.value });
                }}
                value={values?.trailerUrl}
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
            form="movie-edit-form"
          >
            Submit
          </LoadingButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MovieEditModal;
