import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateProfileInfo = createAsyncThunk(
  "profilePage/updateProfile",
  async ({ updateInfo, userInfo }) => {
    const response = await fetch(
      `https://dummyjson.com/auth/users/${userInfo.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${userInfo.token}`,
        },
        body: JSON.stringify(updateInfo),
      }
    );
    const products = await response.json();
    return products;
  }
);

export const profilePageSlice = createSlice({
  name: "profile",
  initialState: {
    updatedProfileInfo: {},
    isLoadingUpdateProfile: false,
    loadingUpdateProfileHasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileInfo.pending, (state) => {
        state.isLoadingUpdateProfile = true;
        state.loadingUpdateProfileHasError = false;
      })
      .addCase(updateProfileInfo.fulfilled, (state, action) => {
        state.isLoadingUpdateProfile = false;
        state.loadingUpdateProfileHasError = false;
        state.updatedProfileInfo = action.payload;
      })
      .addCase(updateProfileInfo.rejected, (state) => {
        state.isLoadingUpdateProfile = false;
        state.loadingUpdateProfileHasError = true;
        state.products = {};
      });
  },
});

export const getUpdatedProfileInfo = (state) => state.profile.updatedProfileInfo;
export const getIsLoadingUpdateProfile = (state) => state.profile.isLoadingUpdateProfile;
export const getloadingUpdateProfileHasError = (state) =>
  state.profile.loadingUpdateProfileHasError;
export default profilePageSlice.reducer;
