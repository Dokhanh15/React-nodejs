import { configureStore } from '@reduxjs/toolkit';
import Loadingslice from './Loadingslice';

const store = configureStore({
  reducer: {
    loading: Loadingslice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
