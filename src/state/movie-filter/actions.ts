import { action, ActionType } from 'typesafe-actions';

export enum ActionTypes {
  SET_MOVIES_YEAR = 'SET_MOVIES_YEAR',
  SET_MOVIES_GENRES = 'SET_MOVIES_GENRES',

  TOOGLE_MOVIES_CAMRIP = 'TOOGLE_MOVIES_CAMRIP',
  SET_MOVIES_CAMRIP = 'SET_MOVIES_CAMRIP',
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
};

export type ActionTypeUnion = ActionType<typeof Actions>;
