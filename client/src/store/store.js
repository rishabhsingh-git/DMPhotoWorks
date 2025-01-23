import { configureStore } from "@reduxjs/toolkit";
import uploadReducer from "./assetsReducer";
import authReducer from "./authReducer";

export const store = configureStore({
  reducer: {
    assets: uploadReducer,
    auth: authReducer,
  },
});
