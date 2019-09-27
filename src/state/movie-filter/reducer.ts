import { ActionTypes, ActionTypeUnion } from './actions';
import { MovieFilterState } from './types';

const defaultYear = new Date().getFullYear().toString();

const initialState: MovieFilterState = {
  movieGenres: '',
  movieYear: defaultYear,
  isCamrip: false,
};

export function reducer(
  state = initialState,
  action: ActionTypeUnion
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
        movieGenres: action.payload,
      };
    }
    case ActionTypes.TOOGLE_MOVIES_CAMRIP: {
      return {
        ...state,
        isCamrip: !state.isCamrip,
      };
    }
    case ActionTypes.SET_MOVIES_CAMRIP: {
      return {
        ...state,
        isCamrip: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
