import { createSelector } from 'reselect';
import { AppState } from '../createStore';

export const getFilterState = (state: AppState) => state.filter;

export const getMovieYearState = createSelector(
  getFilterState,
  state => state.movieYear
);

export const getMovieGenresState = createSelector(
  getFilterState,
  state => state.movieGenres
);

export const getMovieCamripState = createSelector(
  getFilterState,
  state => state.isCamrip
);
