import React, { useEffect } from "react";
import "./DashBoard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  getAllCategoriesLoaded,
  getCategories,
} from "./dashBoardSlice";
import { getIsLogedIn, getUserInfo } from "../loginPage/logInPageSlice";
import { useNavigate } from "react-router";
import CategoryCard from "../../components/categoryCard/CategoryCard";

function DashBoard() {
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);
  const isLogedIn = useSelector(getIsLogedIn);
  const navigateTo = useNavigate();
  const allCategoriesLoaded = useSelector(getAllCategoriesLoaded);
  const allCategories = useSelector(getAllCategories);

  useEffect(() => {
    if (isLogedIn === false) {
      navigateTo("/");
    }
  }, [userInfo, isLogedIn, navigateTo, dispatch]);

  useEffect(() => {
    if (!allCategoriesLoaded && isLogedIn === true) {
      dispatch(getCategories(userInfo));
    }
  }, [allCategoriesLoaded, userInfo, isLogedIn, dispatch]);

  return (
    <div className="DashBoard_Container">
      <div className="DashBoard_Wrapper">
        {
          allCategoriesLoaded && allCategories.map((category, index) => (
            <CategoryCard key={index} category={category}/>
          ))
        }
      </div>
    </div>
  );
}

export default DashBoard;
