import React, { useEffect } from "react";
import "./DashBoard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategoriesStorage,
  getAllCategories,
  getAllCategoriesLoaded,
  getCategories,
} from "./dashBoardSlice";
import {
  fetchLogInStorage,
  getIsLogedIn,
  getUserInfo,
} from "../loginPage/logInPageSlice";
import { useNavigate } from "react-router";
import CategoryCard from "../../components/categoryCard/CategoryCard";
import bannerImage from "../../images/pexels-ksenia-chernaya.jpg";
import { Container, Grid, Typography } from "@mui/material";

function DashBoard() {
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);
  const isLogedIn = useSelector(getIsLogedIn);
  const navigateTo = useNavigate();
  const allCategoriesLoaded = useSelector(getAllCategoriesLoaded);
  const allCategories = useSelector(getAllCategories);

  useEffect(() => {
    const previousLogIn = sessionStorage.getItem("isLogedIn")
      ? JSON.parse(sessionStorage.getItem("isLogedIn"))
      : undefined;
    if (isLogedIn === false && previousLogIn === undefined) {
      navigateTo("/");
    } else if (isLogedIn === false && previousLogIn === true) {
      dispatch(fetchLogInStorage());
    }
  }, [isLogedIn, navigateTo, dispatch]);

  useEffect(() => {
    const previousCategories = sessionStorage.getItem("allCategoriesLoaded")
      ? JSON.parse(sessionStorage.getItem("allCategoriesLoaded"))
      : undefined;
    if (
      !allCategoriesLoaded &&
      isLogedIn === true &&
      previousCategories === undefined
    ) {
      dispatch(getCategories(userInfo));
    } else if (allCategoriesLoaded === false && previousCategories === true) {
      dispatch(fetchAllCategoriesStorage());
    }
  }, [allCategoriesLoaded, userInfo, isLogedIn, dispatch]);

  return (
    <div className="DashBoard_Root">
      <div className="Banner_Container">
        <img src={bannerImage} alt="banner_Image" className="Banner_Image" />
        <Typography
          variant="h1"
          className="Banner_Title"
          position={"absolute"}
          top={0}
          left={0}
        >
          CATEGORIES
        </Typography>
      </div>

      <Container maxWidth="lg">
        <div className="DashBoard_Wrapper">
          <Grid container spacing={2}>
            {allCategoriesLoaded &&
              allCategories.map((category, index) => (
                <Grid key={index} item xs={6} sm={4} md={2}>
                  <CategoryCard category={category} />
                </Grid>
              ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default DashBoard;
