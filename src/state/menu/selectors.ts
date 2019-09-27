import { createSelector } from 'reselect';
import { AppState } from '../createStore';

export const getMenuState = (state: AppState) => state.menu;

export const getMenu = createSelector(
  getMenuState,
  state => state.isMenuVisible
);

export const getCurrentPage = createSelector(
  getMenuState,
  state => state.currentPage
);
