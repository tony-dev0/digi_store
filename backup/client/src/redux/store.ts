import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import cartReducer from './cart/cartSlice';
import productReducer from './product/productSlice';
import adminReducer from './admin/adminSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer, admin: adminReducer, product: productReducer });

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist:['user','cart','product']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
