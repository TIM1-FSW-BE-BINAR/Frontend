import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      if (action.payload) {
        const createdAt = new Date().getTime(); 
        localStorage.setItem("token", action.payload);
        localStorage.setItem("token_created_at", createdAt.toString());
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("token_created_at");
      }
      state.token = action.payload;
    },
  },
});

export const isTokenExpired = () => {
  const createdAt = localStorage.getItem("token_created_at");
  if (!createdAt) return true;

  const now = new Date().getTime();
  const twentyFourHours = 24 * 60 * 60 * 1000; 

  return now - parseInt(createdAt, 10) > twentyFourHours;
};

export const { setToken, setUser } = authSlice.actions;

export default authSlice.reducer;

