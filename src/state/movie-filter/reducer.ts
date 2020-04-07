import { ActionTypes, ActionTypeUnion } from './actions';
import { MovieFilterState } from './types';

const defaultYear = new Date().getFullYear();

const initialState: MovieFilterState = {
  movieYear: defaultYear,
};

export function reducer(
  state = initialState,
  action: ActionTypeUnion,
): MovieFilterState {
  switch (action.type) {
    case ActionTypes.SET_MOVIES_YEAR: {
      return {
        ...state,
        movieYear: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
