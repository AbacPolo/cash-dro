import React, { useState } from "react";
import "./Header.css";
import {
  AppBar,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import logoCashDro from "../../logos/LogoCashDro.png";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import {
  getAllCategories,
  getAllCategoriesLoaded,
} from "../../routes/dashboard/dashBoardSlice";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigateTo = useNavigate();
  const location = useLocation();
  const allCategoriesLoaded = useSelector(getAllCategoriesLoaded);
  const allCategories = useSelector(getAllCategories);
  // console.log("location", location);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (category) => {
    setAnchorEl(null);
    navigateTo(`/Dashboard/${category}`);
  };

  const handleLogoClick = () => {
    navigateTo(`/`);
  };

  return (
    <AppBar
      position="static"
      color="secondary"
      // elevation={0}
      className="appBar"
    >
      <Toolbar className="Header">
        <img
          src={logoCashDro}
          alt="auril Logo"
          className="Banner_Logo"
          onClick={handleLogoClick}
        ></img>
        {location.pathname !== "/" && (
          <IconButton
            size="large"
            edge="end"
            color="button"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Menu
          className="Menu"
          id="menu-appbar"
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          marginThreshold={0}
          TransitionComponent={Fade}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 56, left: 0 }}
        >
          {allCategoriesLoaded &&
            allCategories.map((category, index) => (
              <MenuItem onClick={() => handleClose(category)} key={index}>
                <Typography variant="h5">{category}</Typography>
              </MenuItem>
            ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
