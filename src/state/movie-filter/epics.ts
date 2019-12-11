import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';

import { switchMap } from 'rxjs/operators';

import { Actions as filterActions } from '../movie-filter/actions';
import { Actions } from '../pagination/actions';
import { ActionTypes } from './actions';

const currentYear = new Date().getFullYear().toString();

const setMovieYearEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.SET_MOVIES_YEAR),
    switchMap(() => of(Actions.setNextPage('')))
  );

const resetMoviesFiltersEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.RESET_MOVIES_FILTERS),
    switchMap(() => of(filterActions.setMoviesYear(currentYear)))
  );

export const epics = [setMovieYearEpic, resetMoviesFiltersEpic];
