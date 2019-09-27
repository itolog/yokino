import { ActionTypes, ActionTypeUnion } from './actions';
import { MenuState } from './types';

const initialState: MenuState = {
  isMenuVisible: false,
  currentPage: '',
};

export function reducer(
  state = initialState,
  action: ActionTypeUnion
): MenuState {
  switch (action.type) {
    case ActionTypes.TOGGLE_MENU: {
      return {
        ...state,
        isMenuVisible: !state.isMenuVisible,
      };
    }
    case ActionTypes.CLOSE_MENU: {
      return {
        ...state,
        isMenuVisible: false,
      };
    }
    case ActionTypes.SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
