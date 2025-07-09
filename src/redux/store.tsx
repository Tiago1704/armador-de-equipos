// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import championsSlice from "./slices/championsSlice";

export const store = configureStore({
  reducer: {
    champions: championsSlice
  },
});

// Inferir tipos
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
