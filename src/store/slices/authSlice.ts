import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem("auth-token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      localStorage.setItem("auth-token", "demo-token");
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.removeItem("auth-token");
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
