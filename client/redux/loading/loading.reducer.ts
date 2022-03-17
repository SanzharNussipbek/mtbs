import { PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from './loading.slice';

const reducers = {
  openSnackbar: (state: LoadingState, action: PayloadAction<{message: string, severity: 'success' | 'error' }>) => {
    state.snackbarMessage = action.payload.message;
    state.snackbarSeverity = action.payload.severity;
    state.snackbarOpen = true;
    return state;
  },
  closeSnackbar: (state: LoadingState, action: PayloadAction) => {
    state.snackbarOpen = false;
    state.snackbarMessage = '';
    state.snackbarSeverity = 'success';
    return state;
  },
};

export default reducers;
