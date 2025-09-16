import { configureStore } from '@reduxjs/toolkit';
import { apiService } from '../services/api';
import dashboardSlice from '../slices/dashboardSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [apiService.util.resetApiState.type],
      },
    }).concat(apiService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
