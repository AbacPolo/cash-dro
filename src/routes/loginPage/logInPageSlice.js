import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const logInAuth = createAsyncThunk(
  "controlPanel/logInAuth",
  async ({ usernameValue, passwordValue }) => {
    console.log("usernameValue", usernameValue);
    console.log("passwordValue", passwordValue);
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameValue,
        password: passwordValue,
      }),
    });
    const userInfo = await response.json();
    return userInfo;
  }
);

export const logInPageSlice = createSlice({
  name: "logIn",
  initialState: {
    userInfo: {},
    isLogedIn: false,
    isLogingIn: false,
    logInHasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logInAuth.pending, (state) => {
        state.isLogedIn = false;
        state.isLogingIn = true;
        state.loadingResultsHasError = false;
      })
      .addCase(logInAuth.fulfilled, (state, action) => {
        state.isLogedIn = true;
        state.isLogingIn = false;
        state.loadingResultsHasError = false;
        state.userInfo = action.payload;
      })
      .addCase(logInAuth.rejected, (state) => {
        state.isLogedIn = false;
        state.isLogingIn = false;
        state.loadingResultsHasError = true;
        state.diceResults = {};
      });
  },
});

export const getUserInfo = (state) => state.logIn.userInfo;
export const getIsLogedIn = (state) => state.logIn.isLogedIn;
export const getIsLogingIn = (state) => state.logIn.isLogingIn;
export const getLogInHasError = (state) => state.logIn.logInHasError;
export const {} = logInPageSlice.actions;
export default logInPageSlice.reducer;
