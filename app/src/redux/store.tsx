import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import notificationReducer from './slices/notification.slice';
import { apiSlice } from './api/api.slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: import.meta.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
