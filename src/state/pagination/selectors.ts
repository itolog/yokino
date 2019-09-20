import { createSelector } from 'reselect';
import { AppState } from '../createStore';

export const getPaginationState = (state: AppState) => state.pagination;

export const getNextPage = createSelector(
  getPaginationState,
  state => state.nextPage
);
