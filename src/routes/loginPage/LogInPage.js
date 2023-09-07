import React, { useEffect, useState } from "react";
import "./LogInPage.css";
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import {
  getIsLogedIn,
  getUserInfo,
  getUserProfile,
  logInAuth,
} from "./logInPageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function LogInPage() {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isLogedIn = useSelector(getIsLogedIn);
  const userInfo = useSelector(getUserInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logInAuth({ usernameValue, passwordValue }));
  };

  useEffect(() => {
    if (isLogedIn === true) {
      dispatch(getUserProfile(userInfo));
      navigate("/Dashboard");
    }
  }, [userInfo, isLogedIn, navigate, dispatch]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="LogInPage_Container">
      <div className="LogInPage_Wrapper">
        <form onSubmit={handleSubmit} className="Form_Content">
          <FormLabel>
            <Typography variant="h2">Log In</Typography>
          </FormLabel>
          <FormControl fullWidth>
            <InputLabel htmlFor="input-Username">
              Username
            </InputLabel>
            <OutlinedInput
              id="input-Username"
              aria-describedby="Username"
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.currentTarget.value)}
              required
              label="Username"
              color="button"
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="input-Password">Password</InputLabel>
            <OutlinedInput
              id="input-Password"
              aria-describedby="Password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.currentTarget.value)}
              required
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
                }
              label="Password"
              color="button"
            />
          </FormControl>
          <Button
            variant="contained"
            color="button"
            type="submit"
            value="Submit"
          >
            <Typography variant="button">Submit</Typography>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LogInPage;
