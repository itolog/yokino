import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';

import { switchMap, take } from 'rxjs/operators';

import { Actions, ActionTypes } from './actions';

const menuToggleEpic: Epic = action$ =>
  action$.pipe(
    ofType(ActionTypes.TOGGLE_MENU),
    switchMap(() => of(Actions.toggleMenu())),
    take(1)
  );

export const epics = [menuToggleEpic];
