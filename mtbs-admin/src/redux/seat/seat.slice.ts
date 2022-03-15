import { createSlice } from '@reduxjs/toolkit';
import { Seat } from "../../types/types";
import reducers from './seat.reducer';

export interface SeatState {
  seat: Seat | null;
  seatList: Seat[];
};

export const initialState: SeatState = {
  seat: null,
  seatList: [],
};

export const seatSlice = createSlice({
  name: 'seat',
  initialState,
  reducers,
});

export const {
  setSeat,
  setSeats,
} = seatSlice.actions;

export default seatSlice.reducer;
