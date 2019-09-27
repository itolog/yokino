import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';

import { switchMap } from 'rxjs/operators';

import { Actions as filterActions } from '../movie-filter/actions';
import { Actions } from '../pagination/actions';
import { ActionTypes } from './actions';

const setMovieYearEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.SET_MOVIES_YEAR),
    switchMap(() => of(Actions.setNextPage(''))),
    switchMap(() => of(filterActions.setMoviesCamrip(false)))
  );
export const epics = [setMovieYearEpic];
