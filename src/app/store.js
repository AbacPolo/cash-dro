import { configureStore } from "@reduxjs/toolkit";
import logInReducer from "../routes/loginPage/logInPageSlice"
import dashBoardReducer from "../routes/dashboard/dashBoardSlice"
import categoryReducer from "../routes/categoryPage/categoryPageSlice"
import profileReducer from "../routes/profilePage/profilePageSlice"

export const store = configureStore({
  reducer: {
    logIn: logInReducer,
    dashboard: dashBoardReducer,
    category: categoryReducer,
    profile: profileReducer
  },
});
