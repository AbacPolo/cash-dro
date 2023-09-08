import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const logInAuth = createAsyncThunk(
  "logIn/logInAuth",
  async ({ usernameValue, passwordValue }) => {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameValue,
        password: passwordValue,
      }),
    });
    if (response.status === 200) {
      const userInfo = await response.json();
      return userInfo;
    } else {
      throw new Error();
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "logIn/getUserProfile",
  async (data) => {
    const response = await fetch(
      `https://dummyjson.com/auth/users/${data.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${data.token}`,
        },
      }
    );
    if (response.status === 200) {
      const userProfile = await response.json();
      return userProfile;
    } else {
      throw new Error();
    }
  }
);

export const logInPageSlice = createSlice({
  name: "logIn",
  initialState: {
    userInfo: {},
    isLogedIn: false,
    isLogingIn: false,
    logInHasError: false,
    userProfile: {},
    isLoadingProfile: false,
    loadingProfileHasError: false,
  },
  reducers: {
    fetchLogInStorage: (state, action) => {
      state.userInfo = JSON.parse(sessionStorage.userInfo);
      state.userProfile = JSON.parse(sessionStorage.userProfile);
      state.isLogedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInAuth.pending, (state, action) => {
        state.isLogedIn = false;
        state.isLogingIn = true;
        state.logInHasError = false;
      })
      .addCase(logInAuth.fulfilled, (state, action) => {
        state.isLogedIn = true;
        sessionStorage.setItem("isLogedIn", "true");
        state.isLogingIn = false;
        state.logInHasError = false;
        state.userInfo = action.payload;
        sessionStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(logInAuth.rejected, (state, action) => {
        state.isLogedIn = false;
        state.isLogingIn = false;
        state.logInHasError = true;
        state.diceResults = {};
      })
      .addCase(getUserProfile.pending, (state, action) => {
        state.isLoadingProfile = true;
        state.loadingProfileHasError = false;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoadingProfile = false;
        state.loadingProfileHasError = false;
        state.userProfile = action.payload;
        sessionStorage.setItem("userProfile", JSON.stringify(action.payload));
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoadingProfile = false;
        state.loadingProfileHasError = true;
        state.userProfile = {};
      });
  },
});

export const getUserInfo = (state) => state.logIn.userInfo;
export const getIsLogedIn = (state) => state.logIn.isLogedIn;
export const getIsLogingIn = (state) => state.logIn.isLogingIn;
export const getLogInHasError = (state) => state.logIn.logInHasError;
export const getUserProfileInfo = (state) => state.logIn.userProfile;
export const { fetchLogInStorage } = logInPageSlice.actions;
export default logInPageSlice.reducer;
