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
import { Person } from "@mui/icons-material";
import { getUserInfo } from "../../routes/loginPage/logInPageSlice";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigateTo = useNavigate();
  const location = useLocation();
  const allCategoriesLoaded = useSelector(getAllCategoriesLoaded);
  const allCategories = useSelector(getAllCategories);
  const username = useSelector(getUserInfo).username;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (category) => {
    setAnchorEl(null);
    if (typeof category === "string") {
      navigateTo(`/Categories/${category}`);
    }
  };

  const handleLogoClick = () => {
    navigateTo(`/Categories`);
  };

  const handleProfile = () => {
    navigateTo(`/Profile/${username}`);
  };

  return (
    <AppBar
      position="static"
      color="secondary"
      className="AppBar"
    >
      <Toolbar className="Header">
        <img
          src={logoCashDro}
          alt="auril Logo"
          className="Banner_Logo"
          onClick={handleLogoClick}
        ></img>
        {location.pathname !== "/" && (
          <div>
            <IconButton
              size="large"
              edge="end"
              color="button"
              aria-label="profile"
              aria-controls="profile-appbar"
              aria-haspopup="true"
              onClick={handleProfile}
            >
              <Person />
            </IconButton>
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
          </div>
        )}
        <Menu
          className="Menu"
          id="menu-appbar"
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          marginThreshold={0}
          TransitionComponent={Fade}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {allCategoriesLoaded &&
            allCategories.map((category, index) => (
              <MenuItem onClick={() => handleClose(category)} key={index}>
                <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
                  {category.replaceAll("-", " ")}
                </Typography>
              </MenuItem>
            ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
