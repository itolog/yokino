import { action, ActionType } from 'typesafe-actions';

export enum ActionTypes {
  TOGGLE_MENU = 'TOGGLE_MENU',
  CLOSE_MENU = 'CLOSE_MENU',
}

export const Actions = {
  toggleMenu: () => action(ActionTypes.TOGGLE_MENU),
  closeMenu: () => action(ActionTypes.CLOSE_MENU),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
