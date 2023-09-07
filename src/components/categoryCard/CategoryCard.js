import React from "react";
import "./CategoryCard.css";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

function CategoryCard({ category }) {
  const navigateTo = useNavigate();

  const handleClick = (category) => {
    navigateTo(`/Dashboard/${category}`);
  };

  return (
    <Button
      variant="contained"
      color="button"
      className="CategoryCard_Container"
      onClick={() => handleClick(category)}
    >
      <div className="CategoryCard_Wrapper">
        <Typography variant="h4">{category.replaceAll('-',' ')}</Typography>
      </div>
    </Button>
  );
}

export default CategoryCard;
