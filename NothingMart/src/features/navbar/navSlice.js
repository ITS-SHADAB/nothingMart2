import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCategoryApi } from './navApi';

const initialState = {
  pending: false,
  data: [],
  selectedCategory: 'Categories',
  error: null,
};

export const fetchCategory = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const data = await fetchCategoryApi();
    return data;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.pending = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.pending = false;
      state.error = action.error.message;
    });
  },
});

export default categorySlice.reducer;
export const { changeCategory } = categorySlice.actions;
