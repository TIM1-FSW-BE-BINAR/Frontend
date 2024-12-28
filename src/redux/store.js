import { configureStore } from "@reduxjs/toolkit";
import slices from "./slices";
import { setToken, isTokenExpired } from "./slices/auth";

// it will make temporary global state/ database FE
export const store = configureStore({
  reducer: slices,
  devTools: import.meta.env.MODE == "development",
});

const initializeAuth = (store) => {
  if (isTokenExpired()) {
    localStorage.removeItem("token");
    localStorage.removeItem("token_created_at");
    store.dispatch(setToken(null)); // Hapus token dari Redux state
  }
};

initializeAuth(store);
