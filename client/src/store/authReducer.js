import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../common/common";

export const createLogin = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("api/auth/login", data, {
        withCredentials: true,
      });

      if (response.data.payload) {
        localStorage.setItem(
          "userDetails",
          JSON.stringify(response.data.payload)
        );
      }
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue({
          ...error.response.data,
          status: error.response.status,
        });
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    status: null,
    error: {
      isError: false,
      message: "",
    },
  },
  reducers: {
    clearLoginMessage: (state, action) => {
      state.isError = false;
      state.error.isError = false;
      state.error.message = "";
      state.message = "";
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.status = action.payload.status;
      })
      .addCase(createLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error.isError = true;
        state.message = action.payload.error.message;
      });
  },
});

export const { clearLoginMessage } = authSlice.actions;
export default authSlice.reducer;
