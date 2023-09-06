import React, { useEffect, useState } from "react";
import "./CategoryPage.css";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsLoadingProducts,
  getProducts,
  getProductsInCategory,
} from "./categoryPageSlice";
import { getUserInfo } from "../loginPage/logInPageSlice";

function CategoryPage() {
  const location = useLocation().pathname.replaceAll("/Dashboard/", "").replaceAll('%20','-');
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);
  const [currentCategory, setCurrentCategory] = useState('');
  const products = useSelector(getProducts);
  const loadingProducts = useSelector(getIsLoadingProducts);
  console.log('products',products);

  useEffect(() => {
    if (currentCategory !== location) {
      dispatch(getProductsInCategory({ userInfo, location }));
      setCurrentCategory(location);
    }
  }, [currentCategory, dispatch, userInfo, location]);

  return (
    <div className="CategoryPage_Container">
      <div className="CategoryPage_Wrapper"></div>
    </div>
  );
}

export default CategoryPage;
