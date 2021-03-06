import { ActionTypes, ActionTypeUnion } from './actions';
import { MovieFilterState } from './types';

const initialState: MovieFilterState = {
  movieYear: 0,
  genre_id: 0,
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
    case ActionTypes.SET_MOVIES_GENRES: {
      return {
        ...state,
        genre_id: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
