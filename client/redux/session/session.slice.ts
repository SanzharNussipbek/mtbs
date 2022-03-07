import { createSlice } from '@reduxjs/toolkit';
import { Session } from "../../types/types";
import reducers from './session.reducer';

export interface SessionState {
  session: Session | null;
};

export const initialState: SessionState = {
  session: null,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers,
});

export const {
  setSession,
} = sessionSlice.actions;

export default sessionSlice.reducer;
