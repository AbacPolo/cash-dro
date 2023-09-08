import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProductsInCategory = createAsyncThunk(
  "categoryPage/getProducts",
  async ({ userInfo, category }) => {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${userInfo.token}`,
        },
      }
    );
    if (response.status === 200) {
      const products = await response.json();
      return products;
    } else {
      throw new Error();
    }
  }
);

export const categoryPageSlice = createSlice({
  name: "category",
  initialState: {
    products: [],
    isLoadingProducts: false,
    loadingProductsHasError: false,
  },
  reducers: {
    fetchProductsStorage: (state, action) => {
      state.products = JSON.parse(sessionStorage.getItem(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsInCategory.pending, (state) => {
        state.isLoadingProducts = true;
        state.loadingProductsHasError = false;
        state.products = [];
      })
      .addCase(getProductsInCategory.fulfilled, (state, action) => {
        state.isLoadingProducts = false;
        state.loadingProductsHasError = false;
        state.products = action.payload.products;
        sessionStorage.setItem(
          action.payload.products[0].category,
          JSON.stringify(action.payload.products)
        );
      })
      .addCase(getProductsInCategory.rejected, (state) => {
        state.isLoadingProducts = false;
        state.loadingProductsHasError = true;
        state.products = [];
      });
  },
});

export const getProducts = (state) => state.category.products;
export const getIsLoadingProducts = (state) => state.category.isLoadingProducts;
export const getLoadingProductsHasError = (state) =>
  state.category.loadingProductsHasError;
export const { fetchProductsStorage } = categoryPageSlice.actions;
export default categoryPageSlice.reducer;
