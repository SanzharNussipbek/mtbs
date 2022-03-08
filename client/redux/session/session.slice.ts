import { createSlice } from '@reduxjs/toolkit';
import { Session, SessionSeat } from "../../types/types";
import reducers from './session.reducer';

export interface SessionState {
  session: Session | null;
  sessionSeats: SessionSeat[];
};

export const initialState: SessionState = {
  session: null,
  sessionSeats: [],
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers,
});

export const {
  setSession,
  setSessionSeats,
} = sessionSlice.actions;

export default sessionSlice.reducer;
