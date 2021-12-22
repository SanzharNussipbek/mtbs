import React, { useState } from "react";
import { Image, ScrollView, Pressable } from "react-native";

import { Text, View } from "../../components/Themed";
import { RootStackScreenProps } from "../../types";
import NotFoundScreen from "../NotFoundScreen";

import { styles } from "./PostScreen.styles";

export default function PostScreen(props: RootStackScreenProps<"Post">) {
  const post = props?.route?.params?.post;

  return post ? (
    <View>
      <ScrollView style={styles.container}>
        <View style={styles.poster}>
          <Image style={styles.img} source={{ uri: post?.imgUrl }} />
          <Text style={styles.title}>{post?.title}</Text>
        </View>
        <View style={styles.block}>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Author:</Text>
            <Text style={styles.infoText}>{post?.author}</Text>
          </View>
        </View>
        <View style={styles.block}>
          <Text style={styles.descriptionText}>{post?.body}</Text>
        </View>
      </ScrollView>
    </View>
  ) : (
    NotFoundScreen
  );
}
