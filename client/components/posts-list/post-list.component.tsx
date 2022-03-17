import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Alert, FlatList } from "react-native";

import { View } from "../Themed";
import { Post } from "../../types/types";
import { GET_ALL_POSTS } from "../../utils/gql";

import Loader from "../loader/loader.component";
import PostsListItem from "../posts-list-item/posts-list-item.component";

import { styles } from "./post-list.styles";

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { called, loading } = useQuery(GET_ALL_POSTS, {
    onCompleted(data) {
      setPosts(data?.getPosts);
    },
    onError(err) {
      Alert.alert("ERROR", err.message);
    },
  });

  return called && loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={posts}
        style={styles.list}
        renderItem={({ item, index }) => (
          <PostsListItem post={item} key={index} />
        )}
        keyExtractor={(post: any) => post.id}
      />
    </View>
  );
};

export default PostsList;
