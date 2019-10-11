import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { ActionType, StateType } from 'typesafe-actions';
// Epics import
import { epics as favoriteMovieEpics } from './favorites-movies/epics';
import { reducer as favoriteMovieReducer } from './favorites-movies/reducer';

import { ActionTypeUnion as MenuActionType } from './menu/actions';
// Reducers import
import { reducer as menuReducer } from './menu/reducer';
import { epics as filterEpics } from './movie-filter/epics';
import { reducer as filterReducer } from './movie-filter/reducer';
import { ActionTypeUnion as PaginationActions } from './pagination/actions';
import { epics as paginationEpics } from './pagination/epics';
import { reducer as paginationReducer } from './pagination/reducer';
import { epics as userEpics } from './user/epics';

import { reducer as userReducer } from './user/reducer';

const rootEpic = combineEpics(
  ...filterEpics,
  ...paginationEpics,
  ...favoriteMovieEpics,
  ...userEpics,
);
const epicMiddleware = createEpicMiddleware();

// Reducers
const reducer = combineReducers({
  menu: menuReducer,
  pagination: paginationReducer,
  filter: filterReducer,
  favoriteMovie: favoriteMovieReducer,
  user: userReducer,
});

export type RootActions = ActionType<MenuActionType | PaginationActions>;

export type AppState = StateType<typeof reducer>;

export default (preloadedState: any) => {
  const middlewares = [ epicMiddleware ];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [ middlewareEnhancer ];
  const composedEnhancers: any = composeWithDevTools(...enhancers);

  const store = createStore(reducer, preloadedState, composedEnhancers);

  epicMiddleware.run(rootEpic);

  return store;
};
