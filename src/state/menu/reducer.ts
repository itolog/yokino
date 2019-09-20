import { ActionTypes, ActionTypeUnion } from './actions';
import { MenuState } from './types';

const initialState: MenuState = {
  isMenuVisible: false,
};

export function reducer(
  state = initialState,
  action: ActionTypeUnion
): MenuState {
  switch (action.type) {
    case ActionTypes.TOGGLE_MENU: {
      return {
        isMenuVisible: !state.isMenuVisible,
      };
    }
    default: {
      return state;
    }
  }
}
