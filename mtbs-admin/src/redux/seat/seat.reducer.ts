import { PayloadAction } from '@reduxjs/toolkit';
import { Seat } from '../../types/types';
import { SeatState } from './seat.slice';

const reducers = {
  setSeat: (state: SeatState, action: PayloadAction<Seat | null>) => {
    state.seat = action.payload;
    return state;
  },
  setSeats: (state: SeatState, action: PayloadAction<Seat[]>) => {
    state.seatList = action.payload;
    return state;
  },
};

export default reducers;
