import { createSelector } from 'reselect';
import { AppState } from '../createStore';

export const getFilterState = (state: AppState) => state.filter;

export const getMovieYearState = createSelector(
  getFilterState,
  state => state.movieYear
);
