import * as React from "react";
import { StyleSheet } from "react-native";
import MoviesList from "../components/movies-list/movies-list.component";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";

export default function MovieScreen(props: RootStackScreenProps<"Movie">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text>{props.route.params.movie.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
