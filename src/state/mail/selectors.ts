import { createSelector } from 'reselect';
import { AppState } from '../createStore';

export const SnackBarState = (state: AppState) => state.snackbar;

export const isSnackBarOpen = createSelector(
  SnackBarState,
  state => state.isOpen,
);

export const snackBarMessage = createSelector(
  SnackBarState,
  state => state.message,
);
