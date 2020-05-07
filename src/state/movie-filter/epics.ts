import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';

import { switchMap } from 'rxjs/operators';

import { Actions as filterActions } from '../movie-filter/actions';
import { ActionTypes } from './actions';


const resetMoviesFiltersEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.RESET_MOVIES_FILTERS),
    switchMap(() =>
      of(filterActions.setMoviesYear(0), filterActions.setMoviesGenres(0)),
    ),
  );

export const epics = [
  resetMoviesFiltersEpic,
];
