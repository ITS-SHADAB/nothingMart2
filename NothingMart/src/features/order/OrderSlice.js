import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  allOrderApi,
  createOrderApi,
  deleteOrderApi,
  getOrderApi,
  updateOrderApi,
} from './OrderApi';

const initialState = {
  loading: false,
  userOrder: [],
  allOrder: [],
  error: null,
};

export const createOrder = createAsyncThunk(
  'order/createOreder',
  async (data) => {
    const resp = await createOrderApi(data);
    return resp;
  }
);
export const getOrder = createAsyncThunk('order/getOrder', async () => {
  const resp = await getOrderApi();
  return resp;
});
export const allgetOrder = createAsyncThunk('order/allOrder', async () => {
  const resp = await allOrderApi();
  return resp;
});
export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (order) => {
    const resp = await deleteOrderApi(order);
    return resp.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (update) => {
    const resp = await updateOrderApi(update);
    return resp.data;
  }
);
const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      // state.userOrder = action.payload;
      // because when i get order then it get allOrder of user
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(allgetOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(allgetOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.allOrder = action.payload;
    });
    builder.addCase(allgetOrder.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.userOrder = action.payload;
    });
    builder.addCase(getOrder.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(updateOrderAsync.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(updateOrderAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.allOrder = action.payload;
    });
    builder.addCase(deleteOrder.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.status = 'loading';
      state.allOrder = action.payload;
    });
  },
});

export default orderSlice.reducer;
