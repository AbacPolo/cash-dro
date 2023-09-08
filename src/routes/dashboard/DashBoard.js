import React, { useEffect } from "react";
import "./DashBoard.css";
import { useDispatch, useSelector } from "react-redux";
import {
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
    const previousLogIn = JSON.parse(sessionStorage.isLogedIn);
    if (isLogedIn === false && previousLogIn === undefined) {
      navigateTo("/");
    } else if (previousLogIn === true) {
      dispatch(fetchLogInStorage());
    }
  }, [isLogedIn, navigateTo, dispatch]);

  useEffect(() => {
    if (!allCategoriesLoaded && isLogedIn === true) {
      dispatch(getCategories(userInfo));
    }
  }, [allCategoriesLoaded, userInfo, isLogedIn, dispatch]);

  return (
    <div className="DashBoard_Root">
      <div className="banner_Container">
        <img src={bannerImage} alt="banner_Image" className="banner_Image" />
        <Typography
          variant="h1"
          className="banner_Title"
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
