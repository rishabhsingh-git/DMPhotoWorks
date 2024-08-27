import { configureStore } from "@reduxjs/toolkit";
import uploadReducer from "./assetsReducer";

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
  },
});
