import { createSlice } from '@reduxjs/toolkit';
import reducers from './loading.reducer';

export interface LoadingState {
  snackbarOpen: boolean;
  snackbarMessage: string;
  snackbarSeverity: 'success' | 'error';
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
