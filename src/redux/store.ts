import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

import {persistReducer, persistStore} from 'redux-persist';
import {reduxStorage} from './redux-storage';

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
