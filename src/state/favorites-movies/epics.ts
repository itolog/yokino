import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';

import { catchError, switchMap } from 'rxjs/operators';

import MyAppDatabase from '../../shared/services/indexedDB.service';

import { Actions, ActionTypes } from './actions';

const saveFavoriteMovieEpic: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.SAVE_FAVORITE_MOVIE),
    switchMap(({ payload }) => {
      return MyAppDatabase.save(payload).then(() =>
        Actions.saveFavoriteMovieSuccess(payload),
      );
    }),
    catchError(error => of(Actions.saveFavoriteMovieFailure(error))),
  );

const removeFavoriteMovieEpic: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.REMOVE_FAVORITE_MOVIE),
    switchMap(({ payload }) => {
      return MyAppDatabase.remove(payload).then(() =>
        Actions.removeFavoriteSuccess(payload),
      );
    }),
    catchError(error => of(Actions.removeFavoriteFailure(error))),
  );

const loadFavoriteMovieEpic: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.LOAD_FAVORITE_MOVIE),
    switchMap(() => {
      return MyAppDatabase.getAll().then(res => Actions.loadFavoriteSuccess(res));
    }),
    catchError(error => of(Actions.loadFavoriteFailure(error))),
  );

export const epics = [
  saveFavoriteMovieEpic,
  removeFavoriteMovieEpic,
  loadFavoriteMovieEpic,
];
