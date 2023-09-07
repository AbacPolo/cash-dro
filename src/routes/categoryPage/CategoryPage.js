import React, { useEffect, useState } from "react";
import "./CategoryPage.css";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  // getIsLoadingProducts,
  getProducts,
  getProductsInCategory,
} from "./categoryPageSlice";
import { getIsLogedIn, getUserInfo } from "../loginPage/logInPageSlice";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Typography } from "@mui/material";

function CategoryPage() {
  const category = useLocation().pathname.replaceAll("/Categories/", "");
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);
  const [currentCategory, setCurrentCategory] = useState("");
  const products = useSelector(getProducts);
  // const loadingProducts = useSelector(getIsLoadingProducts);
  const navigateTo = useNavigate();
  const isLogedIn = useSelector(getIsLogedIn);

  useEffect(() => {
    if (isLogedIn === false) {
      navigateTo("/");
    }
  }, [isLogedIn, navigateTo]);

  useEffect(() => {
    if (currentCategory !== category) {
      dispatch(getProductsInCategory({ userInfo, category }));
      setCurrentCategory(category);
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
      headerAlign: "center",
      type: "image",
      filterable: false,
      sortable: false,
      minWidth: "100",
      renderCell: (params) => <img width="100" src={params.value} alt="logo" />,
      align: "center",
      disableColumnMenu: true,
    },
    {
      field: "title",
      headerName: "Product",
      headerAlign: "center",
      filterable: true,
      minWidth: "200",
    },
    {
      field: "brand",
      headerName: "Brand",
      headerAlign: "center",
      filterable: true,
      minWidth: "200",
    },
    {
      field: "price",
      headerName: "Price",
      headerAlign: "center",
      type: "number",
      filterable: true,
      minWidth: "20",
      align: "center",
      disableColumnMenu: true,
    },
    {
      field: "rating",
      headerName: "Rating",
      headerAlign: "center",
      type: "number",
      filterable: true,
      minWidth: "20",
      align: "center",
      disableColumnMenu: true,
    },
  ];

  const rows = products.map((product) => ({
    id: product.id,
    thumbnail: product.thumbnail,
    title: product.title,
    brand: product.brand,
    price: product.price,
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
