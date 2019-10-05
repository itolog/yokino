import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { ActionType, StateType } from 'typesafe-actions';

import { reducer as favoriteMovieReducer } from './favorites-movies/reducer';
import { ActionTypeUnion as MenuActionType } from './menu/actions';
// Reducers import
import { reducer as menuReducer } from './menu/reducer';
import { reducer as filterReducer } from './movie-filter/reducer';
import { ActionTypeUnion as PaginationActions } from './pagination/actions';
import { reducer as paginationReducer } from './pagination/reducer';

// Epics import
import { epics as favoriteMovieEpics } from './favorites-movies/epics';
import { epics as filterEpics } from './movie-filter/epics';
import { epics as paginationEpics } from './pagination/epics';

const rootEpic = combineEpics(
  ...filterEpics,
  ...paginationEpics,
  ...favoriteMovieEpics
);
const epicMiddleware = createEpicMiddleware();

// Reducers
const reducer = combineReducers({
  menu: menuReducer,
  pagination: paginationReducer,
  filter: filterReducer,
  favoriteMovie: favoriteMovieReducer,
});

export type RootActions = ActionType<MenuActionType | PaginationActions>;

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
