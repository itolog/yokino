import { createSelector } from 'reselect';
import { AppState } from '../createStore';

export const FavoritesState = (state: AppState) => state.favoriteMovie;

export const getFavoritesMovies = createSelector(
  FavoritesState,
  state => state.movies,
);
