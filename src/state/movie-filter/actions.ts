import { action, ActionType } from 'typesafe-actions';

export enum ActionTypes {
  SET_MOVIES_YEAR = 'SET_MOVIES_YEAR',

  SET_MOVIES_GENRES = 'SET_MOVIES_GENRES',

  RESET_MOVIES_FILTERS = 'RESET_MOVIES_FILTERS',
}

export const Actions = {
  setMoviesYear: (payload: number) =>
    action(ActionTypes.SET_MOVIES_YEAR, payload),

  setMoviesGenres: (payload: number) =>
    action(ActionTypes.SET_MOVIES_GENRES, payload),

  resetFilters: () => action(ActionTypes.RESET_MOVIES_FILTERS),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
