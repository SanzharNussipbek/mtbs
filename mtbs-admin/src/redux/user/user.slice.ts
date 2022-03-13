import { createSlice } from '@reduxjs/toolkit';
import { User } from "../../types/types";
import reducers from './user.reducer';

export interface UserState {
  user: User | null;
  token: string | null;
  userList: User[];
};

export const initialState: UserState = {
  user: null,
  token: null,
  userList: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
});

export const {
  setUser,
  setUsers,
} = userSlice.actions;

export default userSlice.reducer;
