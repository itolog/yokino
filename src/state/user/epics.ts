import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';

import { catchError, switchMap } from 'rxjs/operators';
import AuthTokenService from '../../shared/services/authToken.service';
import UserService from '../../shared/services/user.service';


import { Actions, ActionTypes } from './actions';

const setUserEpic: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.SET_USER),
    switchMap(({ payload }: any) => {
      UserService.setUser(payload);
      return of(payload);
    }),
    switchMap((res) => {
      AuthTokenService.setAuthToken(res.access_token);
      return of(Actions.setUserSuccess(res));
    }),
    catchError(() => of(Actions.setUserFailure('auth flow error'))),
  );


const removeUserEpic: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.REMOVE_USER),
    switchMap(() => {
      UserService.deleteUser();
      AuthTokenService.removeAuthToken();
      return of(Actions.removeUserSuccess());
    }),
    catchError(() => of(Actions.removeUserFailure('remove user error'))),
  );

const loadUserEpic: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.LOAD_USER),
    switchMap(() => {
      return UserService.getUser().pipe(
        switchMap((res) => {
          return of(Actions.setUserSuccess(res));
        }),
      );
    }),
    catchError(() => of(Actions.setUserFailure('auth flow error'))),
  );


export const epics = [ setUserEpic, loadUserEpic, removeUserEpic ];
