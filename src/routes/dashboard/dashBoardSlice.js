import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk(
  "dashBoardPage/getCategories",
  async (data) => {
    const response = await fetch(
      "https://dummyjson.com/auth/products/categories",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${data.token}`,
        },
      }
    );
    if (response.status === 200) {
      const categories = await response.json();
      return categories;
    } else {
      throw new Error();
    }
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
  reducers: {
    fetchAllCategoriesStorage: (state, action) => {
      state.allCategories = JSON.parse(sessionStorage.getItem("allCategories"));
      state.allCategoriesLoaded = true;
    },
  },
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
        sessionStorage.setItem("allCategoriesLoaded", "true");
        state.allCategories = action.payload;
        sessionStorage.setItem("allCategories", JSON.stringify(action.payload));
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
export const { fetchAllCategoriesStorage } = dashBoardSlice.actions;
export default dashBoardSlice.reducer;
