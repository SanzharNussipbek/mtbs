import { createSlice } from '@reduxjs/toolkit';
import { Post } from "../../types/types";
import reducers from './post.reducer';

export interface PostState {
  post: Post | null;
  postList: Post[];
};

export const initialState: PostState = {
  post: null,
  postList: [],
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers,
});

export const {
  setPost,
  setPosts,
} = postSlice.actions;

export default postSlice.reducer;
