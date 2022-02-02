import React, { useCallback, useState } from "react";
import { Image, ScrollView, Pressable, Linking } from "react-native";
import {
  Button,
  Heading,
  Text as NativeText,
  ChevronLeftIcon,
  Link,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Text, View } from "../../components/Themed";
import { RootStackScreenProps } from "../../types";
import { Post } from "../../types/types";

import NotFoundScreen from "../NotFoundScreen";

import { styles } from "./PostScreen.styles";

export default function PostScreen(props: RootStackScreenProps<"Post">) {
  const navigation = useNavigation();
  const post: Post = props?.route?.params?.post;

  const handleGoBack = () => {
    navigation.navigate("Root");
  };

  const handleOpenSource = useCallback(async () => {
    const supported = await Linking.canOpenURL(post?.sourceUrl);

    if (supported) {
      await Linking.openURL(post?.sourceUrl);
    }
  }, [post?.sourceUrl]);

  return post ? (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Button
          size={"lg"}
          variant='ghost'
          colorScheme='secondary'
          leftIcon={<ChevronLeftIcon style={{ marginRight: -10 }} />}
          onPress={handleGoBack}
          style={styles.backButton}
        >
          Back
        </Button>
        <Heading color='white' style={{ flex: 1, textAlign: "center" }}>
          Post
        </Heading>
      </View>
      <View style={styles.poster}>
        <Image style={styles.img} source={{ uri: post?.imgUrl }} />
        <Heading size='xl' style={styles.title}>
          {post?.title}
        </Heading>
      </View>
      <View style={styles.block}>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>Author:</Text>
          <Text style={styles.infoText} onPress={handleOpenSource}>
            {post?.author}
          </Text>
        </View>
      </View>
      <View style={styles.block}>
        <Text style={styles.descriptionText}>{post?.body}</Text>
      </View>
    </ScrollView>
  ) : (
    NotFoundScreen
  );
}
