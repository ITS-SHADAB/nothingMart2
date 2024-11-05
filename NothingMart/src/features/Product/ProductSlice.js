import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchCreateProduct,
  fetchproductApi,
  fetchProductUpdateApi,
} from './ProductApi';

const initialState = {
  loading: false,
  arrProduct: [],
  error: null,
};

export const fetchproduct = createAsyncThunk(
  'product/fetchProduct',
  async () => {
    const resp = await fetchproductApi();
    return resp;
  }
);
export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (data) => {
    const resp = await fetchProductUpdateApi(data);
    return resp;
  }
);
export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (data) => {
    const resp = await fetchCreateProduct(data);
    return resp;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchproduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchproduct.fulfilled, (state, action) => {
      state.loading = false;
      state.arrProduct = action.payload;
    });
    builder.addCase(fetchproduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.arrProduct.push(action.payload);
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      const updatedProduct = action.payload;
      const index = state.arrProduct.findIndex(
        (product) => product.id === updatedProduct.id
      );
      if (index !== -1) {
        // Update product in the array immutably
        state.arrProduct = [
          ...state.arrProduct.slice(0, index),
          // ...state.arrProduct.slice(0, index, updateProduct),
          updatedProduct,
          ...state.arrProduct.slice(index + 1),
        ];
      }
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default productSlice.reducer;
