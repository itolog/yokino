import { Epic, ofType } from 'redux-observable';
import { EMPTY, Observable, of } from 'rxjs';

import { catchError, switchMap } from 'rxjs/operators';

import { Actions, ActionTypes, ActionTypeUnion } from './actions';

import MyAppDatabase from '../../shared/services/indexedDB.service';

const saveFavoriteMovieEpic: Epic = (action$: Observable<ActionTypeUnion>) =>
  action$.pipe(
    ofType(ActionTypes.SAVE_FAVORITE_MOVIE),
    switchMap(({ payload }) => {
      return MyAppDatabase.save(payload).then(() =>
        Actions.saveFavoriteMovieSuccess(payload)
      );
    }),
    catchError(error => of(Actions.saveFavoriteMovieFailure(error)))
  );

const removeFavoriteMovieEpic: Epic = (action$: Observable<ActionTypeUnion>) =>
  action$.pipe(
    ofType(ActionTypes.REMOVE_FAVORITE_MOVIE),
    switchMap(({ payload }) => {
      return MyAppDatabase.remove(payload).then(() =>
        Actions.removeFavoriteSuccess(payload)
      );
    }),
    catchError(error => of(Actions.removeFavoriteFailure(error)))
  );

export const epics = [saveFavoriteMovieEpic, removeFavoriteMovieEpic];
