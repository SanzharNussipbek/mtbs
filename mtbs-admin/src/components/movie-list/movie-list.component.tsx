import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useMutation, useQuery } from "@apollo/client";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import { Movie } from "../../types/types";
import { useAppDispatch } from "../../hooks";
import { Column, Row } from "../table/table.types";
import useModalState from "../../utils/useModalState";
import { setMovieList } from "../../redux/movie/movie.slice";
import { openSnackbar } from "../../redux/loading/loading.slice";
import { DELETE_MOVIE, GET_ALL_MOVIES } from "../../utils/gql/movie";

import Table from "../table/table.component";
import Loader from "../loader/loader.component";
import Dialog from "../dialog/dialog.component";
import MovieEditModal from "../movie-edit-modal/movie-edit-modal.component";
import MovieCreateModal from "../movie-create-modal/movie-create-modal.component";

import { Styled } from "./movie-list.styles";

const columns: Column[] = [
  { title: "ID", field: "id" },
  { title: "Name", field: "name", width: 300 },
  { title: "Description", field: "description", width: 500 },
  { title: "Duration", field: "duration" },
  { title: "Language", field: "language" },
  { title: "Release date", field: "releaseDate" },
  { title: "Country", field: "country" },
  { title: "Genre", field: "genre" },
  { title: "Director", field: "director" },
  { title: "Cast", field: "cast", width: 300 },
  { title: "Rating", field: "rating" },
  { title: "Image URL", field: "imgUrl" },
  { title: "Trailer URL", field: "trailerUrl" },
  { title: "Actions", field: "actions" },
];

const MovieList: React.FC = () => {
  const dispatch = useAppDispatch();

  const [movieId, setMovieId] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { isOpen: isCreateOpen, onToggle: toggleCreate } = useModalState();
  const { isOpen: isEditOpen, onToggle: toggleEdit } = useModalState();
  const { isOpen: isDeleteOpen, onToggle: toggleDelete } = useModalState();

  const { called, loading, error, data, refetch } = useQuery(GET_ALL_MOVIES, {
    onError(err) {
      dispatch(
        openSnackbar({
          message: "Error while fetching movies list. See the logs.",
          severity: "error",
        })
      );
      console.error(JSON.stringify(err, null, 2));
    },
  });

  const [deleteMovie, { called: isDeleteCalled, loading: isDeleteLoading }] =
    useMutation(DELETE_MOVIE, {
      update(_, { data }) {
        refetch();
        setMovieId("");
        dispatch(
          openSnackbar({
            message: "Movie deleted successfully!",
            severity: "success",
          })
        );
      },
      onError(err) {
        dispatch(
          openSnackbar({
            message: "Error while deleting the movie. See the logs.",
            severity: "error",
          })
        );
        console.error(JSON.stringify(err, null, 2));
        // setErrors(err?.graphQLErrors[0]?.extensions?.errors);
      },
      variables: { id: movieId },
    });

  useEffect(() => {
    if (!data) return;
    setMovies(data.getAllMovies);
    dispatch(setMovieList(data.getAllMovies));
  }, [data]);

  useEffect(() => {
    setRows(
      movies.map((movie) => {
        return {
          ...movie,
          releaseDate: format(new Date(movie?.releaseDate), "dd.MM.yyyy"),
          description: (
            <Box maxHeight={100} overflow="auto">
              {movie.description}
            </Box>
          ),
          imgUrl: (
            <Link href={movie.imgUrl} target="_blank">
              Link to poster
            </Link>
          ),
          trailerUrl: (
            <Link href={movie.trailerUrl} target="_blank">
              Link to trailer
            </Link>
          ),
          actions: (
            <ButtonGroup>
              <IconButton
                color="warning"
                onClick={() => handleEditMovie(movie)}
              >
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDeleteMovie(movie?.id)}
              >
                <Delete />
              </IconButton>
            </ButtonGroup>
          ),
        };
      })
    );
  }, [movies]);

  const handleEditMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    toggleEdit();
  };

  const handleDeleteMovie = (id: string) => {
    setMovieId(id);
    toggleDelete();
  };

  const handleDeleteSubmit = () => {
    toggleDelete();
    deleteMovie({ variables: { id: movieId } });
  };

  const onCreateMovie = () => {
    refetch();
  };

  return (called && loading) || (isDeleteCalled && isDeleteLoading) ? (
    <Loader fullscreen />
  ) : error ? (
    <Alert severity="error" title={error?.message} />
  ) : (
    <Styled.Container>
      <Box display={"flex"} justifyContent="space-between">
        <Typography variant="h5" color="primary">
          Movies
        </Typography>
        <Button color="info" variant="contained" onClick={toggleCreate}>
          Create
        </Button>
      </Box>
      <Table columns={columns} rows={rows} />
      <Dialog
        open={isDeleteOpen}
        confirmText="Delete"
        title="Delete Movie"
        description="Are you sure you want to delete this movie?"
        onClose={toggleDelete}
        onSubmit={handleDeleteSubmit}
        pending={false}
      />
      <MovieCreateModal
        open={isCreateOpen}
        onClose={toggleCreate}
        onCreateCallback={onCreateMovie}
      />
      <MovieEditModal
        data={selectedMovie}
        open={isEditOpen}
        onClose={toggleEdit}
      />
    </Styled.Container>
  );
};

export default MovieList;
