import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk(
  "dashBoardPage/getCategories",
  async (data) => {
    console.log(data)
    const response = await fetch(
      "https://dummyjson.com/auth/products/categories",
      {
        method: "GET",
        headers: {
          "Content-Content-Type": "application/json",
          Authorization: `${data.token}`,
        },
      }
    );
    const categories = await response.json();
    return categories;
  }
);

export const dashBoardSlice = createSlice({
  name: "dashboard",
  initialState: {
    allCategories: [],
    allCategoriesLoaded: false,
    isLoadingCategories: false,
    loadingCategoriesHasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.allCategoriesLoaded = false;
        state.isLoadingCategories = true;
        state.loadingCategoriesHasError = false;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoadingCategories = false;
        state.loadingCategoriesHasError = false;
        state.allCategoriesLoaded = true;
        state.allCategories = action.payload;
      })
      .addCase(getCategories.rejected, (state) => {
        state.isLoadingCategories = false;
        state.loadingCategoriesHasError = true;
        state.allCategoriesLoaded = false;
        state.allCategories = {};
      });
  },
});

export const getAllCategories = (state) => state.dashboard.allCategories;
export const getAllCategoriesLoaded = (state) => state.dashboard.allCategoriesLoaded;
export const getIsLoadingCategories = (state) => state.dashboard.isLoadingCategories;
export const getLoadingCategoriesHasError = (state) => state.dashboard.loadingCategoriesHasError;
export default dashBoardSlice.reducer;
