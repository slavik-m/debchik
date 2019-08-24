import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux/es/redux';
import createSagaMiddleware from 'redux-saga';
import { setAutoFreeze } from 'immer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import runSagas from '../sagas/runSagas';
import game from './game/reducer';

const persistConfig = {
  key: 'root',
  storage,
};

if (process.env.NODE_ENV === 'production') {
  setAutoFreeze(false);
}

const rootReducer = combineReducers({
  game,
});

const composeEnhancers = (process.env.NODE_ENV !== 'production'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);


runSagas(sagaMiddleware);

export default store;
export const persistor = persistStore(store);
