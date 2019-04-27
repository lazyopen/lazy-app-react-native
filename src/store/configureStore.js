import {createStore, applyMiddleware} from 'redux';
import {AsyncStorage} from 'react-native';
import {persistStore, autoRehydrate} from 'redux-persist';
import thunk from 'redux-thunk';
import promise from './promiseMiddleware';
import {createLogger} from 'redux-logger';

import reducers from '../reducers';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

let middlewares = [
  thunk,
  promise,
];

if (isDebuggingInChrome) {
  middlewares.push(logger);
}

const createAppStore = applyMiddleware(...middlewares)(createStore);

export default function configureStore (onComplete) {
  const store = autoRehydrate()(createAppStore)(reducers);
  persistStore(store, {storage: AsyncStorage}, onComplete);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}
