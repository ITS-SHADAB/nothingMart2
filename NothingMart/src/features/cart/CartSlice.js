import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addCartItem,
  clearCartApi,
  deleteItem,
  fetchCartByUser,
  fetchDeccreaseItem,
  fetchIncreaseItem,
} from './CartApi';

const initialState = {
  arrCart: [],
  loading: false,
  error: null,
};

export const addToCart = createAsyncThunk('cart/addToCart', async (data) => {
  const resp = await addCartItem(data);
  return resp;
});

export const getAllCart = createAsyncThunk('cart/getAllCart', async () => {
  const resp = await fetchCartByUser();

  return resp;
});

export const increaseItem = createAsyncThunk('cart/increase', async (data) => {
  const resp = await fetchIncreaseItem(data);
  return resp;
});
export const decreaseItem = createAsyncThunk('cart/decrease', async (data) => {
  const resp = await fetchDeccreaseItem(data);
  return resp;
});
export const deleteCart = createAsyncThunk('cart/deleteCart', async (data) => {
  const resp = await deleteItem(data);
  return resp;
});
export const clearCart = createAsyncThunk('cart/clearCart', async () => {
  const resp = await clearCartApi();
  return resp;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getAllCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCart.fulfilled, (state, action) => {
      state.loading = false;
      state.arrCart = action.payload;
    });
    builder.addCase(getAllCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.arrCart.push(action.payload);
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(increaseItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(increaseItem.fulfilled, (state, action) => {
      state.loading = false;
      state.arrCart = action.payload;
    });
    builder.addCase(increaseItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(decreaseItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(decreaseItem.fulfilled, (state, action) => {
      state.loading = false;
      state.arrCart = action.payload;
    });
    builder.addCase(decreaseItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCart.fulfilled, (state, action) => {
      state.loading = false;
      state.arrCart = action.payload;
    });
    builder.addCase(deleteCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(clearCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.loading = false;
      state.arrCart = [];
    });
    builder.addCase(clearCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default cartSlice.reducer;
