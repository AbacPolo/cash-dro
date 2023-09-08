import React, { useEffect } from "react";
import "./ProductPage.css";
import { useSelector } from "react-redux";
import { getProducts } from "../categoryPage/categoryPageSlice";
import { useLocation, useNavigate } from "react-router";
import { Container, Grid, Typography } from "@mui/material";
import { Sell, Star, StarBorder } from "@mui/icons-material";
import { getIsLogedIn } from "../loginPage/logInPageSlice";

function ProductPage() {
  const products = useSelector(getProducts);
  const { state } = useLocation();
  const { id } = state;
  const isLogedIn = useSelector(getIsLogedIn);
  const navigateTo = useNavigate();
  const selectedProduct = products.filter((product) => product.id === id)[0];
  const discountedPrice = (
    (selectedProduct.price * (100 - selectedProduct.discountPercentage)) /
    100
  ).toFixed(2);

  const starsArray = new Array(5)
    .fill(0)
    .fill(1, 0, Math.floor(selectedProduct.rating));

  useEffect(() => {
    if (isLogedIn === false) {
      navigateTo("/");
    }
  }, [isLogedIn, navigateTo]);

  console.log('selectedProduct',selectedProduct);

  return (
    <div className="ProductPage_Root">
      <Container>
        <Grid
          container
          spacing={{ xs: 3, md: 6 }}
          className="ProductPage_Wrapper"
        >
          <Grid item xs={12} sm={6}>
            <img
              src={selectedProduct.images[0]}
              alt="Product"
              className="product_Image"
            />
          </Grid>
          <Grid item xs={12} sm={6} className="gridItem_Information">
            <div className="title_Container">
              <Typography variant="h2">{selectedProduct.title}</Typography>
              <Typography variant="h4">{selectedProduct.brand}</Typography>
            </div>
            <div className="price_Container">
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {discountedPrice}€
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: "#9b9b9b", textDecoration: "line-through" }}
              >
                {selectedProduct.price}€
              </Typography>
              <Typography
                variant="h5"
                color="secondary"
                sx={{
                  bgcolor: "#cc9f6b",
                  height: "fit-content",
                  borderRadius: "4px",
                  padding: "2px 5px",
                }}
              >
                -{selectedProduct.discountPercentage}%
              </Typography>
            </div>
            <div className="details_Container">
              <div className="rating_Container">
                {starsArray.map((star, index) => {
                  if (star) {
                    return <Star color="button" key={index} />;
                  } else {
                    return <StarBorder color="button" key={index} />;
                  }
                })}
              </div>
              <div className="rating_Container">
                <Sell />
                <Typography variant="h4">{selectedProduct.stock}</Typography>
              </div>
            </div>
            <div className="description_Container">
              <Typography variant="h4">Characteristics</Typography>
              <Typography variant="body1">
                {selectedProduct.description}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default ProductPage;
