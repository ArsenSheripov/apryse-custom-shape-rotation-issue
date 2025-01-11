import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { middlewares } from './middlewares';
import { combinedReducer } from './reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      // https://github.com/reduxjs/redux-toolkit/issues/415
      immutableCheck: false,
    }).concat([...middlewares]),
});

export const persistor = persistStore(store);
