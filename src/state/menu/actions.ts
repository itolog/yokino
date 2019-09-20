import { action, ActionType } from 'typesafe-actions';

export enum ActionTypes {
  TOGGLE_MENU = 'TOGGLE_MENU',
}

export const Actions = {
  toggleMenu: () => action(ActionTypes.TOGGLE_MENU),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
