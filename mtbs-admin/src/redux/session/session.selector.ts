import { createSelector } from "reselect";
import { RootState } from "../store";

const sessionState = (state: RootState) => state.session;

export const selectSession = createSelector(
  [sessionState],
  (sessionState) => sessionState.session
);

export const selectSessionList = createSelector(
  [sessionState],
  (sessionState) => sessionState.sessionList
);

export const selectSessionSeats = createSelector(
  [sessionState],
  (sessionState) => sessionState.sessionSeats
);
