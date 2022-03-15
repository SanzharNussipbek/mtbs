import { PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/types';
import { PostState } from './post.slice';

const reducers = {
  setPost: (state: PostState, action: PayloadAction<Post | null>) => {
    state.post = action.payload;
    return state;
  },
  setPosts: (state: PostState, action: PayloadAction<Post[]>) => {
    state.postList = action.payload;
    return state;
  },
};

export default reducers;
