import React, { useState } from "react";
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

import { useAppDispatch } from "../../hooks";
import { CREATE_MOVIE } from "../../utils/gql/movie";
import { openSnackbar } from "../../redux/loading/loading.slice";

import LoadingButton from "../loading-button/loading-button.component";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreateCallback: () => void;
};

const MovieCreateModal: React.FC<Props> = ({
  open,
  onClose,
  onCreateCallback,
}) => {
  const dispatch = useAppDispatch();

  const defaultValues = {
    name: "",
    description: "",
    duration: null,
    language: "",
    releaseDate: null,
    country: "",
    genre: "",
    director: "",
    cast: "",
    rating: "",
    imgUrl: "",
    trailerUrl: "",
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: defaultValues,
  });

  const [createMovie, { called, loading }] = useMutation(CREATE_MOVIE, {
    update(_, { data: { createMovie: movieData } }) {
      onCreateCallback();
      onClose();
      dispatch(
        openSnackbar({
          message: "Movie created successfully!",
          severity: "success",
        })
      );
    },
    onError(err) {
      dispatch(
        openSnackbar({
          message: "Error while creating the movie. See the logs.",
          severity: "error",
        })
      );
      console.error(JSON.stringify(err, null, 2));
      // setErrors(err?.graphQLErrors[0]?.extensions?.errors);
    },
    variables: defaultValues,
  });

  const onSubmit = async (values: any, e: any) => {
    e.preventDefault();
    createMovie({ variables: values });
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
        Create Movie
        <IconButton onClick={onClose} disabled={loading}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          id="movie-create-form"
        >
          <Controller
            name="name"
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
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                error={!!errors.name}
                helperText={errors.name && errors.name.message}
                onChange={(value) => {
                  props?.field?.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="description"
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
                multiline
                rows={4}
                maxRows={4}
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                error={!!errors.description}
                helperText={errors.description && errors.description.message}
                onChange={(value) => {
                  props?.field?.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="duration"
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
                id="duration"
                type="number"
                label="Duration"
                name="duration"
                placeholder="Duration in minutes"
                autoComplete="duration"
                error={!!errors.duration}
                helperText={errors.duration && errors.duration.message}
                onChange={(e) => {
                  props.field?.onChange(+e.target.value);
                }}
              />
            )}
          />
          <Controller
            name="language"
            control={control}
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                required
                id="language"
                type="language"
                label="Language"
                name="language"
                autoComplete="language"
                error={!!errors.language}
                helperText={errors.language && errors.language.message}
                onChange={(value) => {
                  props?.field?.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="releaseDate"
            control={control}
            rules={{
              required: "Required field",
            }}
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
                      required
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
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                required
                id="country"
                label="Country"
                name="country"
                autoComplete="country"
                error={!!errors.country}
                helperText={errors.country && errors.country.message}
                onChange={(value) => {
                  props?.field?.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="genre"
            control={control}
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                required
                id="genre"
                label="Genre"
                name="genre"
                autoComplete="genre"
                error={!!errors.genre}
                helperText={errors.genre && errors.genre.message}
                onChange={(value) => {
                  props?.field?.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="director"
            control={control}
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                required
                id="director"
                label="Director"
                name="director"
                autoComplete="director"
                error={!!errors.director}
                helperText={errors.director && errors.director.message}
                onChange={(value) => {
                  props?.field?.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="cast"
            control={control}
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                required
                id="cast"
                label="Cast"
                name="cast"
                autoComplete="cast"
                error={!!errors.cast}
                helperText={errors.cast && errors.cast.message}
                onChange={(value) => {
                  props?.field?.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="rating"
            control={control}
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                required
                id="rating"
                label="Rating"
                name="rating"
                autoComplete="rating"
                error={!!errors.rating}
                helperText={errors.rating && errors.rating.message}
                onChange={(value) => {
                  props?.field?.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="imgUrl"
            control={control}
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                required
                id="imgUrl"
                type="url"
                label="Poster URL"
                name="imgUrl"
                autoComplete="imgUrl"
                error={!!errors.imgUrl}
                helperText={errors.imgUrl && errors.imgUrl.message}
                onChange={(value) => {
                  props?.field?.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="trailerUrl"
            control={control}
            rules={{
              required: "Required field",
            }}
            render={({ ...props }) => (
              <TextField
                {...props}
                margin="normal"
                fullWidth
                required
                id="trailerUrl"
                type="url"
                label="trailerUrl"
                name="trailerUrl"
                autoComplete="trailerUrl"
                error={!!errors.trailerUrl}
                helperText={errors.trailerUrl && errors.trailerUrl.message}
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
            disabled={called && loading}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            size="large"
            pending={called && loading}
            form="movie-create-form"
          >
            Submit
          </LoadingButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MovieCreateModal;
