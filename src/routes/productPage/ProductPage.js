import React from "react";
import "./ProductPage.css";
import { useSelector } from "react-redux";
import { getProducts } from "../categoryPage/categoryPageSlice";
import { useLocation } from "react-router";
import { Typography } from "@mui/material";
import { Sell, Star, StarBorder } from "@mui/icons-material";

function ProductPage() {
  const products = useSelector(getProducts);
  const { state } = useLocation();
  const { id } = state;
  const selectedProduct = products.filter((product) => product.id === id)[0];
  console.log("selectedProduct", selectedProduct);
  const discountedPrice = (
    (selectedProduct.price * (100 - selectedProduct.discountPercentage)) /
    100
  ).toFixed(2);

  const starsArray = new Array(5)
    .fill(0)
    .fill(1, 0, Math.floor(selectedProduct.rating));

  return (
    <div className="ProductPage_Container">
      <div className="ProductPage_Wrapper">
        <div className="title_Container">
          <Typography variant="h2">{selectedProduct.title}</Typography>
          <Typography variant="h4">{selectedProduct.brand}</Typography>
        </div>
        <div className="price_Container">
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {discountedPrice}€
          </Typography>
          <Typography variant="h4" sx={{ color: "#9b9b9b" }}>
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
        <div className="info_Container">
          <div className="rating_Container">
            {/* <Typography variant="h4">{selectedProduct.rating}</Typography> */}
            {starsArray.map((star) => {
              if (star) {
                return <Star color="button" />;
              } else {
                return <StarBorder color="button" />;
              }
            })}
          </div>
          <div className="rating_Container">
            <Sell />
            <Typography variant="h4">{selectedProduct.stock}</Typography>
          </div>
        </div>
        <img
          src={selectedProduct.images[1]}
          alt="Product"
          className="product_Image"
        />
        <div className="description_Container">
          <Typography variant="body1">{selectedProduct.description}</Typography>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;