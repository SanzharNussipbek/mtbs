import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, Pressable } from "react-native";
import {
  Button,
  Heading,
  Text as NativeText,
  ChevronLeftIcon,
} from "native-base";

import { Movie } from "../../types/types";
import { RootStackScreenProps } from "../../types";
import { Text, View } from "../../components/Themed";

import NotFoundScreen from "../NotFoundScreen";

import { styles } from "./MovieScreen.styles";

export default function MovieScreen(props: RootStackScreenProps<"Movie">) {
  const navigation = useNavigation();
  const movie: Movie = props?.route?.params?.movie;

  const [isHidden, setIsHidden] = useState(true);

  const handleGoBack = () => {
    navigation.navigate("Root");
  };

  const toggleHidden = () => {
    setIsHidden((value) => !value);
  };

  return movie ? (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Button
          size={"lg"}
          variant='ghost'
          colorScheme='secondary'
          leftIcon={<ChevronLeftIcon style={{ marginRight: -10 }} />}
          onPress={handleGoBack}
        >
          Back
        </Button>
        <Heading color='white' style={{ flex: 1 }}>
          About the movie
        </Heading>
      </View>
      <View style={styles.hero}>
        <Image style={styles.img} source={{ uri: movie?.imgUrl }} />
        <Heading size='xl' style={styles.title}>
          {movie?.name}
        </Heading>
      </View>
      <View style={styles.block}>
        <NativeText
          color={"muted.50"}
          noOfLines={3}
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
          variant='outline'
          colorScheme='secondary'
          onPress={toggleHidden}
          mb={8}
        >
          {isHidden ? "Show details" : "Hide details"}
        </Button>
      </View>
    </ScrollView>
  ) : (
    NotFoundScreen
  );
}
