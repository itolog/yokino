import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { ActionType, StateType } from 'typesafe-actions';

import { ActionTypeUnion as MenuActionType } from './menu/actions';
import { reducer as menuReducer } from './menu/reducer';

// Epics
import { epics as menuEpics } from './menu/epics';

const rootEpic = combineEpics(...menuEpics);
const epicMiddleware = createEpicMiddleware();

// Reducers
const reducer = combineReducers({
  menu: menuReducer,
});

export type RootActions = ActionType<MenuActionType>;

export type AppState = StateType<typeof reducer>;

export default (preloadedState: any) => {
  const middlewares = [epicMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers: any = composeWithDevTools(...enhancers);
  epicMiddleware.run(rootEpic);
  return createStore(reducer, preloadedState, composedEnhancers);
};
