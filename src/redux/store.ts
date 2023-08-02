import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/slice';
import pizza from './pizza/slice';
import cart from './cart/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter: filter,
    cart: cart,
    pizza: pizza,
  },
});

// добавление store
export type RootState = ReturnType<typeof store.getState>;

// добавление dispatch для typescript
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
