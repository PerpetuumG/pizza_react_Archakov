import { createAsyncThunk } from '@reduxjs/toolkit';
import { Pizza, SearchPizzaParams } from './types';
import axios from 'axios';

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
