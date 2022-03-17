import { createSelector } from "reselect";
import { RootState } from "../store";

const loadingState = (state: RootState) => state.loading;

export const selectSnackbarOpen = createSelector(
  [loadingState],
  (loadingState) => loadingState.snackbarOpen
);

export const selectSnackbarSeverity = createSelector(
  [loadingState],
  (loadingState) => loadingState.snackbarSeverity
);

export const selectSnackbarMessage = createSelector(
  [loadingState],
  (loadingState) => loadingState.snackbarMessage
);
