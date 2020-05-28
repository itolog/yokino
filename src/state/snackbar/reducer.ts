import { ActionTypes, ActionTypeUnion } from './actions';
import { SnackbarState } from './types';

const initialState: SnackbarState = {
  isOpen: false,
  message: null,
  error: null,
};

export function reducer(
  state = initialState,
  action: ActionTypeUnion,
): SnackbarState {
  switch (action.type) {
    case ActionTypes.SET_SNACKBAR_OPEN: {
      return {
        isOpen: true,
        message: action.payload.msg,
        error: action.payload.error,
      };
    }
    case ActionTypes.SET_SNACKBAR_CLOSE: {
      return {
        isOpen: false,
        message: null,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
}
