import { createSlice } from '@reduxjs/toolkit';
import { User } from "../../types/types";
import reducers from './user.reducer';

export interface UserState {
  user: User | null;
  token: string | null;
};

export const initialState: UserState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
});

export const {
  setUser
} = userSlice.actions;

export default userSlice.reducer;
