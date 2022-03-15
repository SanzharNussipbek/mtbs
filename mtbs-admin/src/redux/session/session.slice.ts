import { createSlice } from '@reduxjs/toolkit';
import { Session, SessionSeat } from "../../types/types";
import reducers from './session.reducer';

export interface SessionState {
  session: Session | null;
  sessionList: Session[];
  sessionSeats: SessionSeat[];
};

export const initialState: SessionState = {
  session: null,
  sessionList: [],
  sessionSeats: [],
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers,
});

export const {
  setSession,
  setSessionList,
  setSessionSeats,
} = sessionSlice.actions;

export default sessionSlice.reducer;
