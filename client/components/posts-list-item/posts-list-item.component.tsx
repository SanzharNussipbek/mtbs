import React, { useState, useEffect } from "react";
import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Text, View } from "../Themed";

import { styles } from "./posts-list-item.styles";

type Props = {
  post: any;
};

const PostsListItem: React.FC<Props> = ({ post }) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Post", { post });
  };

  console.log(post);

  return post ? (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.img} source={{ uri: post?.imgUrl }} />
        <View style={styles.text}>
          <Text style={styles.title} numberOfLines={1}>
            {post?.title}
          </Text>
          <Text style={styles.body} numberOfLines={4}>{post?.body}</Text>
        </View>
      </View>
    </TouchableOpacity>
  ) : null;
};

export default PostsListItem;
