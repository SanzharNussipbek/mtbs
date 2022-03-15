import { PayloadAction } from '@reduxjs/toolkit';
import { Hall } from '../../types/types';
import { HallState } from './hall.slice';

const reducers = {
  setHall: (state: HallState, action: PayloadAction<Hall | null>) => {
    state.hall = action.payload;
    return state;
  },
  setHalls: (state: HallState, action: PayloadAction<Hall[]>) => {
    state.hallList = action.payload;
    return state;
  },
};

export default reducers;
