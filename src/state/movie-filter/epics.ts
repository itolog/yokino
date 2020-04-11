import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';

import { switchMap } from 'rxjs/operators';

import { Actions as filterActions } from '../movie-filter/actions';
import { Actions } from '../pagination/actions';
import { ActionTypes } from './actions';

const setMovieYearEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.SET_MOVIES_YEAR),
    switchMap(() => of(Actions.setNextPage(1))),
  );

const setMovieGenreEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.SET_MOVIES_GENRES),
    switchMap(() => of(Actions.setNextPage(1))),
  );

const resetMoviesFiltersEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.RESET_MOVIES_FILTERS),
    switchMap(() =>
      of(filterActions.setMoviesYear(0), filterActions.setMoviesGenres(0)),
    ),
  );

export const epics = [
  // setMovieYearEpic,
  resetMoviesFiltersEpic,
  // setMovieGenreEpic,
];
