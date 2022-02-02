import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Skeleton, Text } from "native-base";

import { View } from "../Themed";
import { Post } from "../../types/types";

import { styles } from "./posts-list-item.styles";

type Props = {
  post: Post;
};

const PostsListItem: React.FC<Props> = ({ post }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const onPress = () => {
    navigation.navigate("Post", { post });
  };

  return post ? (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.poster}>
        {loading ? (
          <View style={styles.skeletonContainer}>
            <Skeleton style={styles.skeleton} />
          </View>
        ) : null}
        <Image
          style={styles.img}
          source={{ uri: post?.imgUrl, cache: "force-cache" }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onLoad={() => setLoading(false)}
        />
      </View>
      <View style={styles.text}>
        <Text style={styles.title} isTruncated color='white'>
          {post?.title}
        </Text>
        <Text style={styles.body} noOfLines={4} isTruncated color='white'>
          {post?.body}
        </Text>
      </View>
    </TouchableOpacity>
  ) : null;
};

export default PostsListItem;
