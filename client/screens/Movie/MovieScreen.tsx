import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, Linking, Alert } from "react-native";
import {
  Button,
  Heading,
  Text as NativeText,
  ChevronLeftIcon,
} from "native-base";
import { useQuery } from "@apollo/client";
import { FontAwesome } from "@expo/vector-icons";

import { Movie } from "../../types/types";
import { RootStackScreenProps } from "../../types";
import { GET_MOVIE_BY_ID } from "../../utils/gql";
import { Text, View } from "../../components/Themed";

import Loader from "../../components/loader/loader.component";
import SessionList from "../../components/session-list/session-list.component";

import { styles } from "./MovieScreen.styles";

export default function MovieScreen(props: RootStackScreenProps<"Movie">) {
  const navigation = useNavigation();
  const id = props?.route?.params?.id;
  const [movie, setMovie] = useState<Movie | null>(null);

  const { called, loading } = useQuery(GET_MOVIE_BY_ID, {
    onCompleted(data) {
      setMovie(data?.getMovie);
    },
    onError(err) {
      Alert.alert("ERROR", err?.message);
    },
    variables: { id: id },
  });

  const [isHidden, setIsHidden] = useState(true);

  const handleGoBack = () => {
    navigation.navigate("Root");
  };

  const toggleHidden = () => {
    setIsHidden((value) => !value);
  };

  const handleOpenTrailer = useCallback(async () => {
    if (!movie) return;
    const supported = await Linking.canOpenURL(movie?.trailerUrl);

    if (supported) {
      await Linking.openURL(movie?.trailerUrl);
    }
  }, [movie?.trailerUrl]);

  return called && loading ? (
    <Loader />
  ) : movie ? (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Button
          size={"lg"}
          variant="ghost"
          colorScheme="secondary"
          leftIcon={<ChevronLeftIcon style={{ marginRight: -10 }} />}
          onPress={handleGoBack}
          style={styles.backButton}
        >
          Back
        </Button>
        <Heading color="white" style={{ flex: 1, textAlign: "center" }}>
          About the movie
        </Heading>
      </View>
      <View style={styles.hero}>
        <Image style={styles.img} source={{ uri: movie?.imgUrl }} />
        <Heading size="xl" style={styles.title}>
          {movie?.name}
        </Heading>
        <Button
          size="12"
          variant="solid"
          colorScheme="danger"
          style={styles.playBtn}
          onPress={handleOpenTrailer}
        >
          <FontAwesome
            size={20}
            color="black"
            name="play"
            style={{ marginLeft: 4 }}
          />
        </Button>
      </View>
      <View style={styles.block}>
        <NativeText
          color={"muted.50"}
          noOfLines={isHidden ? 3 : undefined}
          isTruncated={isHidden}
          style={styles.descriptionText}
        >
          {movie?.description}
        </NativeText>
        {!isHidden ? (
          <View style={styles.block}>
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>Genre:</Text>
              <Text style={styles.infoText}>{movie?.genre}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>Country:</Text>
              <Text style={styles.infoText}>{movie?.country}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>Duration:</Text>
              <Text style={styles.infoText}>{`${movie?.duration} min`}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>Language:</Text>
              <Text style={styles.infoText}>{movie?.language}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>Director:</Text>
              <Text style={styles.infoText}>{movie?.director}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>Rating:</Text>
              <Text style={styles.infoText}>{movie?.rating}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>Release Date:</Text>
              <Text style={styles.infoText}>{movie?.releaseDate}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>Cast:</Text>
              <Text style={styles.infoText}>{movie?.cast}</Text>
            </View>
          </View>
        ) : null}
        <Button
          size={"lg"}
          variant="outline"
          colorScheme="secondary"
          onPress={toggleHidden}
          mb={8}
        >
          {isHidden ? "Show details" : "Hide details"}
        </Button>
      </View>
      <SessionList movieId={movie?.id} />
    </ScrollView>
  ) : null;
}
