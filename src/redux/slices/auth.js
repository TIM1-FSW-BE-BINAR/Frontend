import { createSlice } from "@reduxjs/toolkit";

// Default (initial) state
const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
};

// Slice action and reducer
export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      if (action.payload) {
        const createdAt = new Date().getTime(); // Waktu saat token disimpan
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
  const twentyFourHours = 24 * 60 * 60 * 1000; // 24 jam dalam milidetik

  return now - parseInt(createdAt, 10) > twentyFourHours;
};

// Export the action
export const { setToken, setUser } = authSlice.actions;

// Export the state/reducers
export default authSlice.reducer;

/* 
    Analogy in useState code
*/
// const [user, setUser] = useState(null);
// const [token, setToken] = useState(localStorage.getItem("token") || null);
