import { Epic, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';

import { catchError, delay, switchMap } from 'rxjs/operators';

import { Actions, ActionTypes, ActionTypeUnion } from './actions';

const setNextPageEpic: Epic = (action$: Observable<ActionTypeUnion>) =>
  action$.pipe(
    ofType(ActionTypes.SET_NEXT_PAGE),
    switchMap(action => {
      window.scrollTo(0, 0);
      return of(action);
    }),
    delay(300),
    switchMap(({ payload }) => {
      return of(Actions.setNextPageSuccess(payload));
    }),
    catchError(() => of(Actions.setNextPageFailure('set next page error'))),
  );

export const epics = [setNextPageEpic];
