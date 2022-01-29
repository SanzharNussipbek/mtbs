import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Text, View } from "../Themed";
import { Movie } from "../../types/types";

import { styles } from "./movies-list-item.styles";

type Props = {
  movie: Movie;
};

const MoviesListItem: React.FC<Props> = ({ movie }) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Movie", { movie });
  };

  return movie ? (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={{ uri: movie?.imgUrl }}
        />
        <Text>{movie?.name}</Text>
      </View>
    </TouchableOpacity>
  ) : null;
};

export default MoviesListItem;
