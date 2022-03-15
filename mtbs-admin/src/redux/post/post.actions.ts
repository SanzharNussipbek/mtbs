import { Post } from "../../types/types";
import { setPost, setPosts } from "./post.slice";

export function updatePost(post: Post | null) {
  return setPost(post);
};

export function setPostList(posts: Post[]) {
  return setPosts(posts);
};
