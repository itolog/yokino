import { createSelector } from 'reselect';
import { AppState } from '../createStore';

export const favoriteMoviesState = (state: AppState) => state.favoriteMovie;

export const getFavoriteMoviesIds = createSelector(
  favoriteMoviesState,
  state => state.ids
);
