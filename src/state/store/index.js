import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux/es/redux';
import createSagaMiddleware from 'redux-saga';

import runSagas from '../sagas/runSagas';

import test from './test/reducer';

const rootReducer = combineReducers({
  test,
});

const composeEnhancers = (process.env.NODE_ENV !== 'production'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

runSagas(sagaMiddleware);

export default store;
