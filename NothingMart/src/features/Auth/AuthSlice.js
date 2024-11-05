import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  authenticationApi,
  creatUserApi,
  existUser,
  signOutApi,
  updateUserApi,
} from './AuthApi';

const initialState = {
  loading: false,
  loggedInUser: null,
  alluser: [],
  errore: null,
};

export const isUser = createAsyncThunk(
  'Auth/isUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await existUser();
      return data;
    } catch (error) {
      // Use rejectWithValue to pass error to rejected action
      return rejectWithValue(error.message || 'Failed to fetch user data');
    }
  }
);

export const creatUser = createAsyncThunk(
  'Auth/creatUser',
  async (data, { rejectWithValue }) => {
    try {
      const resp = await creatUserApi(data);
      return resp;
    } catch (error) {
      // Use rejectWithValue to pass the error to the reducer
      return rejectWithValue(error.message);
    }
  }
);

export const authenticationUser = createAsyncThunk(
  'Auth/authenticationUser',
  async (data, { rejectWithValue }) => {
    try {
      const resp = await authenticationApi(data);
      return resp;
      // On success, this data will be available in the fulfilled case
    } catch (error) {
      // Pass the error message to the slice using rejectWithValue
      return rejectWithValue(error.message || 'Failed to authenticate');
    }
  }
);

export const updateUser = createAsyncThunk(
  'Auth/updateUser',
  async (data, { rejectWithValue }) => {
    try {
      const resp = await updateUserApi(data);
      return resp;
    } catch (error) {
      // Use rejectWithValue to pass the error to the reducer
      return rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  'Auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      const resp = await signOutApi();
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.errore = null; // Reset the error state
    },
  },

  extraReducers: (builder) => {
    builder.addCase(creatUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(creatUser.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload;
    });
    builder.addCase(creatUser.rejected, (state, action) => {
      state.loading = false;
      state.errore = action.payload || action.error.message;
    });

    builder.addCase(authenticationUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authenticationUser.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload;
    });
    builder.addCase(authenticationUser.rejected, (state, action) => {
      state.loading = false;
      // If rejected with value, action.payload is used; otherwise, fallback to action.error.message
      state.errore = action.payload;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.errore = action.payload || action.error.message;
    });
    builder.addCase(isUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(isUser.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload;
    });
    builder.addCase(isUser.rejected, (state, action) => {
      state.loading = false;
      state.errore = action.payload || action.error.message;
    });

    builder.addCase(signOut.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.loading = false;
      state.loggedInUser = null;
    });
    builder.addCase(signOut.rejected, (state, action) => {
      state.loading = false;
      state.errore = action.payload || action.error.message;
    });
  },
});

export default AuthSlice.reducer;
export const { clearError } = AuthSlice.actions;
