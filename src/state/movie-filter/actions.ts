import { action, ActionType } from 'typesafe-actions';

export enum ActionTypes {
  SET_MOVIES_YEAR = 'SET_MOVIES_YEAR',

  RESET_MOVIES_FILTERS = 'RESET_MOVIES_FILTERS',
}

export const Actions = {
  setMoviesYear: (payload: string) =>
    action(ActionTypes.SET_MOVIES_YEAR, payload),

  resetFilters: () => action(ActionTypes.RESET_MOVIES_FILTERS),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
