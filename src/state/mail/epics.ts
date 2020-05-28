import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';

import { catchError, switchMap } from 'rxjs/operators';

import { Actions, ActionTypes } from './actions';
import { Actions as snackBarActions } from '../snackbar/actions';

const sendMailEpic: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.SEND_MAIL),
    switchMap(({payload}) => {
      return of(Actions.sendMailSuccess(payload));
    }),
    switchMap(({payload}) => {
      return of(snackBarActions.openSnackBar({ msg: payload, error: null }))
    }),
    catchError((error) => of(
      Actions.sendMailFailure(error.message),
      snackBarActions.openSnackBar({ msg: null, error: error.message })
    )),
  );


export const epics = [ sendMailEpic ];
