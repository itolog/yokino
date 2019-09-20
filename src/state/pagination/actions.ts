import { action, ActionType } from 'typesafe-actions';

export enum ActionTypes {
  SET_NEXT_PAGE = 'SET_NEXT_PAGE',
  SET_NEXT_PAGE_SUCCESS = 'SET_NEXT_PAGE_SUCCESS',
  SET_NEXT_PAGE_FAILURE = 'SET_NEXT_PAGE_FAILURE',
}

export const Actions = {
  setNextPage: (payload: string) => action(ActionTypes.SET_NEXT_PAGE, payload),
  setNextPageSuccess: (payload: string) =>
    action(ActionTypes.SET_NEXT_PAGE_SUCCESS, payload),
  setNextPageFailure: (payload: string) =>
    action(ActionTypes.SET_NEXT_PAGE_FAILURE, payload),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
