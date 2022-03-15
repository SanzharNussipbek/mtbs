import { createSlice } from '@reduxjs/toolkit';
import { Hall } from "../../types/types";
import reducers from './hall.reducer';

export interface HallState {
  hall: Hall | null;
  hallList: Hall[];
};

export const initialState: HallState = {
  hall: null,
  hallList: [],
};

export const hallSlice = createSlice({
  name: 'hall',
  initialState,
  reducers,
});

export const {
  setHall,
  setHalls,
} = hallSlice.actions;

export default hallSlice.reducer;
