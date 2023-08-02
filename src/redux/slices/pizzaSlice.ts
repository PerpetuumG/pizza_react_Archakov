import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

//1. export const fetchPizzas = createAsyncThunk(
export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  //1. async (params: Record<string, string>) => {
  async params => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://64aea1a3c85640541d4d6f3a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );

    /*if (data.length === 0) {
    thunkAPI.rejectWithValue('Пиццы пустые');
  }
  return thunkAPI.fulfillWithValue(data);*/

    //1. return data as CartItem[];
    return data;
  },
);

type Pizza = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  // extraReducers переделали с 2023 года. Нужно использовать именно builders.addCase(... pending | fulfilled | rejected
  extraReducers: builder => {
    builder
      .addCase(fetchPizzas.pending, state => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, state => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
