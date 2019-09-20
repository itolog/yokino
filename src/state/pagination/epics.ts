import { Epic, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';

import { catchError, switchMap, take } from 'rxjs/operators';

import { Actions, ActionTypes } from './actions';
import { ActionTypeUnion } from './actions';

const setNextPageEpic: Epic = (action$: Observable<ActionTypeUnion>) =>
  action$.pipe(
    ofType(ActionTypes.SET_NEXT_PAGE),
    switchMap(({ payload }) => of(Actions.setNextPageSuccess(payload))),
    catchError(() => of(Actions.setNextPageFailure('set next page error')))
  );

export const epics = [setNextPageEpic];
