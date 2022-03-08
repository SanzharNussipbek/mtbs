import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Stack, Heading } from "native-base";
import { Alert, ScrollView, Image } from "react-native";

import { View } from "../Themed";
import { Movie } from "../../types/types";
import { GET_ALL_MOVIES_MUTATION } from "../../utils/gql";

import Loader from "../loader/loader.component";
import MoviesListItem from "../movies-list-item/movies-list-item.component";

import { styles } from "./movies-list.styles";

const MoviesList: React.FC = () => {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentMovies, setCurrentMovies] = useState<Movie[]>([]);
  const [comingSoonMovies, setComingSoonMovies] = useState<Movie[]>([]);

  const { loading, error, data } = useQuery(GET_ALL_MOVIES_MUTATION, {
    onError(err) {
      Alert.alert("ERROR", err.message);
    },
  });

  useEffect(() => {
    if (!error) return;
    Alert.alert("ERROR", error?.message);
  }, [error]);

  useEffect(() => {
    if (!data) return;
    data?.getAllMovies?.map(async (movie: Movie) => {
      await Image.prefetch(movie.imgUrl);
    });
    setMovies(data?.getAllMovies);
  }, [data]);

  useEffect(() => {
    if (!movies?.length) return;
    setCurrentMovies(
      movies.filter((movie: Movie) => new Date(movie.releaseDate) < new Date())
    );
    setComingSoonMovies(
      movies.filter((movie: Movie) => new Date(movie.releaseDate) > new Date())
    );
  }, [movies]);

  return !movies.length || loading ? (
    <Loader />
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.moviesList}>
        <Heading size='xl' color={"secondary.500"} mb={4}>
          Today on screen
        </Heading>
        <ScrollView horizontal>
          <Stack space={4} direction={"row"}>
            {currentMovies.map((movie, index) => (
              <MoviesListItem movie={movie} key={index} />
            ))}
          </Stack>
        </ScrollView>
      </View>
      <View style={styles.moviesList}>
        <Heading size='xl' color={"secondary.500"} mb={4}>
          Coming soon
        </Heading>
        <ScrollView horizontal>
          <Stack space={4} direction={"row"}>
            {comingSoonMovies.map((movie, index) => (
              <MoviesListItem movie={movie} key={index} />
            ))}
          </Stack>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default MoviesList;
