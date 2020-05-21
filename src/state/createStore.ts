import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { ActionType, StateType } from 'typesafe-actions';

// FAVORITES FLOW
import { epics as favoriteMovieEpics } from './favorites-movies/epics';
import { reducer as favoriteMovieReducer } from './favorites-movies/reducer';

// USER FLOW
import { epics as userEpics } from './user/epics';
import { reducer as userReducer } from './user/reducer';

// MENU FLOW
import { ActionTypeUnion as MenuActionType } from './menu/actions';
import { reducer as menuReducer } from './menu/reducer';

// FILTER FLOW
import { epics as filterEpics } from './movie-filter/epics';
import { reducer as filterReducer } from './movie-filter/reducer';

// MAIL FLOW
import { ActionTypeUnion as MailActionType } from './mail/actions';
import {reducer as mailReducer} from './mail/reducer';
import {epics as mailEpic} from './mail/epics'

const rootEpic = combineEpics(
  ...filterEpics,
  ...favoriteMovieEpics,
  ...userEpics,
  ...mailEpic,
);
const epicMiddleware = createEpicMiddleware();

// Reducers
const reducer = combineReducers({
  menu: menuReducer,
  filter: filterReducer,
  favoriteMovie: favoriteMovieReducer,
  user: userReducer,
  mail: mailReducer,
});

export type RootActions = ActionType<MenuActionType | MailActionType>;

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
