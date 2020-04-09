import { action, ActionType } from 'typesafe-actions';

export enum ActionTypes {
  TOGGLE_MENU = 'TOGGLE_MENU',
  CLOSE_MENU = 'CLOSE_MENU',

  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
}

export const Actions = {
  toggleMenu: () => action(ActionTypes.TOGGLE_MENU),
  closeMenu: () => action(ActionTypes.CLOSE_MENU),

  setCurrentPage: (payload: number) =>
    action(ActionTypes.SET_CURRENT_PAGE, payload),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
