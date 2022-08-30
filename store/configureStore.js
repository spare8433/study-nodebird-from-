import { createWrapper } from 'next-redux-wrapper'
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import reducers from '../reducers'
import rootSaga from '../sagas';

const loggerMiddleware = () => (next) => (action) => {
  console.log(action);
  return next(action)
}

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [loggerMiddleware, sagaMiddleware]

  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares))
  const store = createStore(reducers, enhancer);

  store.sagaTask = sagaMiddleware.run(rootSaga)
  return store
}
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
})

export default wrapper
