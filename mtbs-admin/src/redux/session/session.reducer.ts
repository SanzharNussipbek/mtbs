import { PayloadAction } from '@reduxjs/toolkit';
import { Session, SessionSeat } from '../../types/types';
import { SessionState } from './session.slice';

const reducers = {
  setSession: (state: SessionState, action: PayloadAction<Session | null>) => {
    state.session = action.payload;
    return state;
  },
  setSessionSeats: (state: SessionState, action: PayloadAction<SessionSeat[]>) => {
    state.sessionSeats = action.payload;
    return state;
  },
};

export default reducers;
