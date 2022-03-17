import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Skeleton } from "native-base";

import { Text, View } from "../Themed";
import { Movie } from "../../types/types";

import { styles } from "./movies-list-item.styles";

type Props = {
  movie: Movie;
};

const MoviesListItem: React.FC<Props> = ({ movie }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onPress = () => {
    navigation.navigate("Movie", { id: movie?.id });
  };

  return movie ? (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.skeletonContainer}>
            <Skeleton style={styles.skeleton} />
          </View>
        ) : null}
        <Image
          style={styles.img}
          source={{ uri: movie?.imgUrl, cache: "force-cache" }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onLoad={() => setLoading(false)}
        />
        <Text>{movie?.name}</Text>
      </View>
    </TouchableOpacity>
  ) : null;
};

export default MoviesListItem;
