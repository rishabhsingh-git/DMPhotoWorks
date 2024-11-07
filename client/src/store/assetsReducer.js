import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../common/common";

export const uploadAssets = createAsyncThunk(
  "assets/upload",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("api/assets/upload", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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

export const fetchAllAssets = createAsyncThunk(
  "assets/fetchAll",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get("api/assets/", {
        params: query,
      });

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

const uploadAssetSlice = createSlice({
  name: "assets",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    uploadStatus: "",
    isAllAssetsLoading: false,
    isAllAssetsSuccess: false,
    assetsData: [],
    error: {
      isError: false,
      message: "",
    },
  },
  reducers: {
    clearUploadStatus: (state, action) => {
      state.uploadStatus = "";
      state.isSuccess = false;
      state.isError = false;
      state.error.isError = false;
      state.error.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadAssets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadAssets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.uploadStatus = action.payload?.message;
      })
      .addCase(uploadAssets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.uploadStatus = action.payload?.message;
      })
      .addCase(fetchAllAssets.pending, (state) => {
        state.isAllAssetsLoading = true;
      })
      .addCase(fetchAllAssets.fulfilled, (state, action) => {
        state.isAllAssetsLoading = false;
        state.isAllAssetsSuccess = true;
        state.assetsData = action.payload;
      })
      .addCase(fetchAllAssets.rejected, (state, action) => {
        state.isAllAssetsLoading = true;
        state.error.isError = true;
        state.error.message = action.payload?.message;
      });
  },
});

export const { clearUploadStatus } = uploadAssetSlice.actions;
export default uploadAssetSlice.reducer;
