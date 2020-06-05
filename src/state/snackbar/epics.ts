import { Epic, ofType } from 'redux-observable';
import { EMPTY, of } from 'rxjs';

import { switchMap } from 'rxjs/operators';

import { Actions, ActionTypes } from './actions';
import { Actions as userActionTypes } from '../user/actions';


// TODO 
// remove this epic
const openSnackBarEpic: Epic = (action$) =>
  action$.pipe(
    ofType('SET_USER_SUCCESS'),
    switchMap(({ payload }) => {
      return of(EMPTY);
    }),
  );


export const epics = [  ];
