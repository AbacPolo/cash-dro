import React, { useEffect, useState } from "react";
import "./CategoryPage.css";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  // getIsLoadingProducts,
  getProducts,
  getProductsInCategory,
} from "./categoryPageSlice";
import { getUserInfo } from "../loginPage/logInPageSlice";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

function CategoryPage() {
  const category = useLocation().pathname.replaceAll("/Dashboard/", "");
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);
  const [currentCategory, setCurrentCategory] = useState("");
  const products = useSelector(getProducts);
  // const loadingProducts = useSelector(getIsLoadingProducts);
  console.log("products", products);
  console.log("category", category);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (currentCategory !== category) {
      dispatch(getProductsInCategory({ userInfo, category }));
      setCurrentCategory(category);
    }
  }, [currentCategory, dispatch, userInfo, category]);

  const handleRowClick = (params, event, details) => {
    console.log(params);
    const productId = params.id;
    navigateTo(`/Dashboard/${category}/${productId}`);
  };

  const columns = [
    {
      field: "thumbnail",
      headerName: "Thumbnail",
      headerAlign: 'center',
      type: "image",
      filterable: false,
      sortable: false,
      renderCell: (params) => <img width="50" src={params.value} alt="logo"/>,
      align: "center"
    },
    {
      field: "title",
      headerName: "Product",
      headerAlign: 'center',
      filterable: true,
      minWidth: "200",
    },
    {
      field: "brand",
      headerName: "Brand",
      headerAlign: 'center',
      filterable: true,
      minWidth: "200",
      align: "center"
    },
    {
      field: "price",
      headerName: "Price",
      headerAlign: 'center',
      type: "number",
      filterable: true,
      minWidth: "20",
      align: "center"
    },
    {
      field: "rating",
      headerName: "Rating",
      headerAlign: 'center',
      type: "number",
      filterable: true,
      minWidth: "20",
      align: "center"
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

  console.log('rows',rows);

  return (
    <div className="CategoryPage_Container">
      <div className="CategoryPage_Wrapper">
        <Box sx={{ height: "fit-content", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            hideFooter
            onRowClick={handleRowClick}
          />
        </Box>
      </div>
    </div>
  );
}

export default CategoryPage;
