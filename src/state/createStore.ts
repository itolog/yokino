import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { ActionType, StateType } from 'typesafe-actions';

import { ActionTypeUnion as MenuActionType } from './menu/actions';
// Reducers import
import { reducer as menuReducer } from './menu/reducer';
import { reducer as paginationReducer } from './pagination/reducer';

// Epics import
import { epics as menuEpics } from './menu/epics';
import { epics as paginationEpics } from './pagination/epics';

const rootEpic = combineEpics(...menuEpics, ...paginationEpics);
const epicMiddleware = createEpicMiddleware();

// Reducers
const reducer = combineReducers({
  menu: menuReducer,
  pagination: paginationReducer,
});

export type RootActions = ActionType<MenuActionType>;

export type AppState = StateType<typeof reducer>;

export default (preloadedState: any) => {
  const middlewares = [epicMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers: any = composeWithDevTools(...enhancers);

  const store = createStore(reducer, preloadedState, composedEnhancers);

  epicMiddleware.run(rootEpic);

  return store;
};
