import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Alert, FlatList } from "react-native";

import { View } from "../Themed";
import { GET_ALL_MOVIES_MUTATION } from "../../utils/gql";
import MoviesListItem from "../movies-list-item/movies-list-item.component";

import { styles } from "./movies-list.styles";

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const { loading, error, data } = useQuery(GET_ALL_MOVIES_MUTATION);

  useEffect(() => {
    if (!error) return;
    console.log(JSON.stringify(error, null, 2));
    Alert.alert(error.graphQLErrors[0].message);
  }, [error]);

  useEffect(() => {
    if (!data) return;
    setMovies(data?.getAllMovies);
  }, [data]);

  return movies.length ? (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={movies}
        renderItem={({ item, index }) => (
          <MoviesListItem movie={item} key={index} />
        )}
        keyExtractor={(movie: any) => movie.id}
      />
    </View>
  ) : null;
};

export default MoviesList;
