import { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/types';
import { UserState } from './user.slice';

const reducers = {
  setUser: (state: UserState, action: PayloadAction<User | null>) => {
    state.user = action.payload;
    return state;
  },
};

export default reducers;
