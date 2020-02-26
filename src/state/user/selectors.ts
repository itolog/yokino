import { createSelector } from 'reselect';
import { AppState } from '../createStore';

export const getUserState = (state: AppState) => state.user;

export const isLoggedUser = createSelector(
  getUserState,
  state => state.isLogged
)