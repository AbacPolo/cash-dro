import React, { useEffect, useState } from "react";
import "./CategoryPage.css";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsStorage,
  getProducts,
  getProductsInCategory,
} from "./categoryPageSlice";
import { fetchLogInStorage, getIsLogedIn, getUserInfo } from "../loginPage/logInPageSlice";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Typography } from "@mui/material";

function CategoryPage() {
  const category = useLocation().pathname.replaceAll("/Categories/", "");
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);
  const [currentCategory, setCurrentCategory] = useState("");
  const products = useSelector(getProducts);

  const navigateTo = useNavigate();
  const isLogedIn = useSelector(getIsLogedIn);

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
    const previousProducts = sessionStorage.getItem(category)
      ? JSON.parse(sessionStorage.getItem(category))
      : undefined;
      if (currentCategory !== category && previousProducts === undefined) {
       dispatch(getProductsInCategory({ userInfo, category }));
       setCurrentCategory(category);
      } else if (previousProducts) {
        dispatch(fetchProductsStorage(category));
      }
    }, [currentCategory, dispatch, userInfo, category]);

  const handleRowClick = (params, event, details) => {
    const productId = params.id;
    navigateTo(`/Categories/${category}/${productId}`, {
      state: { id: productId },
    });
  };

  const columns = [
    {
      field: "thumbnail",
      headerName: "Thumbnail",
      type: "image",
      filterable: false,
      sortable: false,
      renderCell: (params) => <img width="100" src={params.value} alt="logo" />,
      align: "center",
      disableColumnMenu: true,
      minWidth: 100,
      flex: 0.5
    },
    {
      field: "title",
      headerName: "Product",
      filterable: true,
      minWidth: 200,
      flex: 1
    },
    {
      field: "brand",
      headerName: "Brand",
      filterable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: "price",
      headerName: "Price",
      filterable: true,
      align: "center",
      disableColumnMenu: true,
      minWidth: 100,
      flex: 0.5
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      filterable: true,
      align: "center",
      disableColumnMenu: true,
      minWidth: 100,
      flex: 0.5
    },
  ];

  const rows = products.map((product) => ({
    id: product.id,
    thumbnail: product.thumbnail,
    title: product.title,
    brand: product.brand,
    price: `${product.price}€`,
    rating: product.rating,
  }));

  return (
    <Container className="CategoryPage_Container">
      <div className="CategoryPage_Wrapper">
        <Typography variant="h2">{category.replaceAll("-", " ")}</Typography>
        <Box sx={{ height: "fit-content", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            hideFooter
            onRowClick={handleRowClick}
            rowHeight={80}
          />
        </Box>
      </div>
    </Container>
  );
}

export default CategoryPage;
