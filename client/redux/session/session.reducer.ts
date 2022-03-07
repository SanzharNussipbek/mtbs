import { PayloadAction } from '@reduxjs/toolkit';
import { Session } from '../../types/types';
import { SessionState } from './session.slice';

const reducers = {
  setSession: (state: SessionState, action: PayloadAction<Session | null>) => {
    state.session = action.payload;
    return state;
  },
};

export default reducers;
