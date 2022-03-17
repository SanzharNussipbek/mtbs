import React, { useCallback, useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { Button, Heading, ChevronLeftIcon } from "native-base";
import { Image, ScrollView, Linking, Alert } from "react-native";

import { Post } from "../../types/types";
import { RootStackScreenProps } from "../../types";
import { Text, View } from "../../components/Themed";
import { GET_POST_BY_ID } from "../../utils/gql";

import Loader from "../../components/loader/loader.component";

import { styles } from "./PostScreen.styles";

export default function PostScreen(props: RootStackScreenProps<"Post">) {
  const navigation = useNavigation();
  const id = props?.route?.params?.id;
  const [post, setPost] = useState<Post | null>(null);

  const { called, loading } = useQuery(GET_POST_BY_ID, {
    onCompleted(data) {
      setPost(data?.getPost);
    },
    onError(err) {
      Alert.alert("ERROR", err?.message);
    },
    variables: { id: id },
  });

  const handleGoBack = () => {
    navigation.navigate("Root");
  };

  const handleOpenSource = useCallback(async () => {
    if (!post) return;
    const supported = await Linking.canOpenURL(post?.sourceUrl);

    if (supported) {
      await Linking.openURL(post?.sourceUrl);
    }
  }, [post?.sourceUrl]);

  return called && loading ? (
    <Loader />
  ) : post ? (
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
          Post
        </Heading>
      </View>
      <View style={styles.poster}>
        <Image style={styles.img} source={{ uri: post?.imgUrl }} />
        <Heading size="xl" style={styles.title}>
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
  ) : null;
}
