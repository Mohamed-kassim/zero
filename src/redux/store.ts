import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

import {persistReducer, persistStore} from 'redux-persist';
import {Storage} from 'redux-persist';
import {storage} from '../utils/storage';

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};
const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: 'root',
  storage: reduxStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false, // disable thunk since you’re using saga
      serializableCheck: false, // redux-persist state might fail this check
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Required for PersistGate
export const persistor = persistStore(store);
export default store;
