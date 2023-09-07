import React, { useEffect, useState } from "react";
import "./LogInPage.css";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputLabel,
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

function LogInPage() {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
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

  return (
    <div className="LogInPage_Container">
      <div className="LogInPage_Wrapper">
        <form onSubmit={handleSubmit} className="Form_Content">
          <FormLabel>
            <Typography variant="h3">Log In</Typography>
          </FormLabel>
          <FormControl fullWidth>
            <InputLabel htmlFor="input-Username" color="">
              Username
            </InputLabel>
            <Input
              id="input-Username"
              aria-describedby="Username"
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.currentTarget.value)}
              required
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="input-Password">Password</InputLabel>
            <Input
              id="input-Password"
              aria-describedby="Password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.currentTarget.value)}
              required
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
