import { configureStore } from "@reduxjs/toolkit";
import logInReducer from "../routes/loginPage/logInPageSlice"

export const store = configureStore({
  reducer: {
    logIn: logInReducer
  },
});
