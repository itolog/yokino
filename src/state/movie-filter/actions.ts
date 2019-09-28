import { action, ActionType } from 'typesafe-actions';

export enum ActionTypes {
  SET_MOVIES_YEAR = 'SET_MOVIES_YEAR',
  SET_MOVIES_GENRES = 'SET_MOVIES_GENRES',

  TOOGLE_MOVIES_CAMRIP = 'TOOGLE_MOVIES_CAMRIP',
  SET_MOVIES_CAMRIP = 'SET_MOVIES_CAMRIP',

  RESET_MOVIES_FILTERS = 'RESET_MOVIES_FILTERS',
}

export const Actions = {
  setMoviesYear: (payload: string) =>
    action(ActionTypes.SET_MOVIES_YEAR, payload),
  setMoviesGenres: (payload: string) =>
    action(ActionTypes.SET_MOVIES_GENRES, payload),

  toggleMoviesCamrip: (payload: boolean) =>
    action(ActionTypes.TOOGLE_MOVIES_CAMRIP, payload),
  setMoviesCamrip: (payload: boolean) =>
    action(ActionTypes.SET_MOVIES_CAMRIP, payload),

  resetFilters: () => action(ActionTypes.RESET_MOVIES_FILTERS),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
