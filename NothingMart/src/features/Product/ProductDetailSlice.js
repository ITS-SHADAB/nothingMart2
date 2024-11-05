import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductDetailApi } from './ProductApi';

const initialState = {
  loading: false,
  detail: [],
  error: null,
};

export const fetchProductDeatail = createAsyncThunk(
  'product/fetchProductDetail',
  async (id) => {
    const resp = await fetchProductDetailApi(id);
    return resp;
  }
);

const detailSlice = createSlice({
  name: 'productDetail',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProductDeatail.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductDeatail.fulfilled, (state, action) => {
      state.loading = false;
      state.detail = action.payload;
    });
    builder.addCase(fetchProductDeatail.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export default detailSlice.reducer;
