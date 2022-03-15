import { createSelector } from 'reselect';
import { RootState } from '../store';

const seat = (state: RootState) => state.seat;

export const selectSeat = createSelector([seat], (seat) => seat.seat);

export const selectSeatList = createSelector([seat], (seat) => seat.seatList);
