import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../common/common";
import axios from "axios";

export const uploadAssets = createAsyncThunk(
  "assets/upload",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:4000/api/assets/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(`================================>`, response);
    return response;
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    status: "idle",
    error: null,
    imageUrl: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadAssets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadAssets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.imageUrl = action.payload.url;
      })
      .addCase(uploadAssets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default uploadSlice.reducer;
