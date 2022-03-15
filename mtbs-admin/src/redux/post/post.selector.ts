import { createSelector } from 'reselect';
import { RootState } from '../store';

const post = (state: RootState) => state.post;

export const selectPost = createSelector([post], (post) => post.post);

export const selectPostList = createSelector([post], (post) => post.postList);
