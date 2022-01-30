import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Alert, FlatList } from "react-native";

import { View } from "../Themed";
import { GET_POSTS } from "../../utils/gql";
import { Post } from "../../types/types";

import Loader from "../loader/loader.component";
import PostsListItem from "../posts-list-item/posts-list-item.component";

import { styles } from "./post-list.styles";

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { loading, error, data } = useQuery(GET_POSTS);

  useEffect(() => {
    if (!error) return;
    console.log(JSON.stringify(error, null, 2));
    Alert.alert(error.graphQLErrors[0].message);
  }, [error]);

  useEffect(() => {
    if (!data) return;
    setPosts(data?.getPosts);
  }, [data]);

  return loading ? (
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