import { createSelector } from 'reselect';
import { RootState } from '../store';

const hall = (state: RootState) => state.hall;

export const selectHall = createSelector([hall], (hall) => hall.hall);

export const selectHallList = createSelector([hall], (hall) => hall.hallList);
