import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProductsInCategory = createAsyncThunk(
  "categoryPage/getProducts",
  async ({userInfo, category}) => {
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
     const products = await response.json();
     return products;
  }
);

export const categoryPageSlice = createSlice({
  name: "category",
  initialState: {
    products: [],
    isLoadingProducts: false,
    loadingProductsHasError: false,
  },
  reducers: {},
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
export const getLoadingProductsHasError = (state) => state.category.loadingProductsHasError;
export default categoryPageSlice.reducer;
