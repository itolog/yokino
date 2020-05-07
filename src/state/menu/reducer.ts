import { ActionTypes, ActionTypeUnion } from './actions';
import { MenuState } from './types';

const initialState: MenuState = {
  isMenuVisible: false,
};

export function reducer(
  state = initialState,
  action: ActionTypeUnion,
): MenuState {
  switch (action.type) {
    case ActionTypes.TOGGLE_MENU: {
      return {
        ...state,
        isMenuVisible: !state.isMenuVisible,
      };
    }
    case ActionTypes.OPEN_MENU: {
      return {
        ...state,
        isMenuVisible: true,
      };
    }
    case ActionTypes.CLOSE_MENU: {
      return {
        ...state,
        isMenuVisible: false,
      };
    }
    default: {
      return state;
    }
  }
}
