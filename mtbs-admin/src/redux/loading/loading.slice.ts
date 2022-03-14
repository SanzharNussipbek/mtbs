import { AlertColor } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';
import reducers from './loading.reducer';

export interface LoadingState {
  snackbarOpen: boolean;
  snackbarMessage: string;
  snackbarSeverity: AlertColor;
};

export const initialState: LoadingState = {
  snackbarOpen: false,
  snackbarMessage: '',
  snackbarSeverity: 'success',
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers,
});

export const {
  openSnackbar,
  closeSnackbar,
} = loadingSlice.actions;

export default loadingSlice.reducer;
