import { createSelector } from 'reselect';
import { RootState } from '../store';

const user = (state: RootState) => state.user;

export const selectUser = createSelector([user], (user) => user.user);
