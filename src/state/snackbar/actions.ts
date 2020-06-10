import { action, ActionType } from 'typesafe-actions';


export enum ActionTypes {
   SET_SNACKBAR_OPEN = 'SET_SNACKBAR_OPEN',
   SET_SNACKBAR_CLOSE = 'SET_SNACKBAR_CLOSE',
}

export const Actions = {
  openSnackBar: (payload: { msg: string | null, error: string | null }) => action(ActionTypes.SET_SNACKBAR_OPEN, payload),

  closeSnackBar: () => action(ActionTypes.SET_SNACKBAR_CLOSE),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
