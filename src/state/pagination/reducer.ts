import { ActionTypes, ActionTypeUnion } from './actions';
import { PaginationState } from './types';

const initialState: PaginationState = {
  nextPage: '1',
  error: '',
};

export function reducer(
  state = initialState,
  action: ActionTypeUnion
): PaginationState {
  switch (action.type) {
    case ActionTypes.SET_NEXT_PAGE_SUCCESS: {
      return {
        ...state,
        nextPage: action.payload,
      };
    }
    case ActionTypes.SET_NEXT_PAGE_FAILURE: {
      return {
        ...state,
        error: action.type,
      };
    }
    default: {
      return state;
    }
  }
}
