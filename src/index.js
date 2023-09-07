import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./routes/dashboard/DashBoard";
import LogInPage from "./routes/loginPage/LogInPage";
import CategoryPage from "./routes/categoryPage/CategoryPage";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  //<React.StrictMode>
  <HashRouter>
    {/*Use BrowserRouter outside GH-Pages */}
    <Provider store={store}>
      <Routes>
        <Route exact path="/" element={<App />}>
          <Route exact path="/" element={<LogInPage />} />
          <Route exact path="/Dashboard" element={<DashBoard />} />
          <Route exact path="/Dashboard/:category" element={<CategoryPage />} />
          <Route exact path="/Dashboard/:category/:productId" element={<CategoryPage />} />
        </Route>
      </Routes>
    </Provider>
  </HashRouter>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();