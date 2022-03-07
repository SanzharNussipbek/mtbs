import { createSelector } from "reselect";
import { RootState } from "../store";

const sessionState = (state: RootState) => state.session;

export const selectSession = createSelector(
  [sessionState],
  (sessionState) => sessionState.session
);
