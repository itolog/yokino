import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';

import { catchError, switchMap } from 'rxjs/operators';
import {authTokenService} from '../../shared/services/authToken.service';
import {userService} from '../../shared/services/user.service';


import { Actions, ActionTypes } from './actions';
import { Actions as snackBarActions } from '../snackbar/actions';

const setUserEpic: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.SET_USER),
    switchMap(({ payload }: any) => {
      userService.setUser(payload);
      return of(payload);
    }),
    switchMap((res) => {
      authTokenService.setAuthToken(res.access_token);
      return of(Actions.setUserSuccess(res));
    }),
    switchMap(() => {
      return of(snackBarActions.openSnackBar({ msg: 'вы успешно вошли', error: null }));
    }),
    catchError(() => of(
      Actions.setUserFailure('auth flow error'),
      snackBarActions.openSnackBar({ msg: null, error: 'ошибка входа' })),
    ),
  );


const removeUserEpic: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.REMOVE_USER),
    switchMap(() => {
      userService.deleteUser();
      authTokenService.removeAuthToken();
      return of(Actions.removeUserSuccess());
    }),
    catchError(() => of(Actions.removeUserFailure('remove user error'))),
  );

const loadUserEpic: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.LOAD_USER),
    switchMap(() => {
      return userService.getUser().pipe(
        switchMap((res) => {
          return of(Actions.setUserSuccess(res));
        }),
      );
    }),
    catchError(() => of(Actions.setUserFailure('auth flow error'))),
  );


export const epics = [ setUserEpic, loadUserEpic, removeUserEpic ];
