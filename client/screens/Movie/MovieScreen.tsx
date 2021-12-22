import React, { useState } from "react";
import { Image, ScrollView, Pressable } from "react-native";

import { Text, View } from "../../components/Themed";
import { RootStackScreenProps } from "../../types";
import NotFoundScreen from "../NotFoundScreen";

import { styles } from "./MovieScreen.styles";

export default function MovieScreen(props: RootStackScreenProps<"Movie">) {
  const movie = props?.route?.params?.movie;

  const [showDescription, setShowDescription] = useState(false);

  return movie ? (
    <ScrollView style={styles.container}>
      <View style={styles.poster}>
        <Image style={styles.img} source={{ uri: movie?.imgUrl }} />
        <Text style={styles.title}>{movie?.name}</Text>
      </View>
      <View style={styles.block}>
        {showDescription ? (
          <>
            <Text style={styles.blockTitle}>Description</Text>
            <Text style={styles.descriptionText}>{movie?.description}</Text>
          </>
        ) : null}
        <Pressable
          onPress={() => setShowDescription((value) => !value)}
          style={styles.descriptionBtn}
        >
          <Text
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {showDescription ? "Hide description" : "Show description"}
          </Text>
        </Pressable>
      </View>
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Details</Text>
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
      </View>
    </ScrollView>
  ) : (
    NotFoundScreen
  );
}
