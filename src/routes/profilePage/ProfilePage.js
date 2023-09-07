import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { getIsLogedIn, getUserInfo, getUserProfileInfo } from "../loginPage/logInPageSlice";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { updateProfileInfo } from "./profilePageSlice";
import { useNavigate } from "react-router";

function ProfilePage() {
  const userProfile = useSelector(getUserProfileInfo);
  const userInfo = useSelector(getUserInfo);
  const [editProfile, setEditProfile] = useState(false);
  const [username, setUsername] = useState(userProfile.username);
  const [firstName, setFirstName] = useState(userProfile.firstName);
  const [lastName, setLastName] = useState(userProfile.lastName);
  const [birthDate, setBirthDate] = useState(userProfile.birthDate);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const dispatch = useDispatch();

  const isLogedIn = useSelector(getIsLogedIn);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (isLogedIn === false) {
      navigateTo("/");
    }
  }, [ isLogedIn, navigateTo]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setEditProfile(false);
    const updateInfo = {
        editProfile: editProfile,
        username: username,
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        email: email,
        phone: phone
    }
    dispatch(updateProfileInfo({updateInfo, userInfo}))
  };

  return (
    <Container className="ProfilePage_Container">
      <div className="ProfilePage_Wrapper">
        <form
          onSubmit={handleSubmit}
          className="Form_Content profileForm_Content"
        >
          <FormLabel className="profileForm_Title">
            <Typography variant="h2">Profile</Typography>
            <IconButton
              color="button"
              onClick={(e) => setEditProfile(true)}
            >
              <Edit />
            </IconButton>
          </FormLabel>
          <FormControl fullWidth>
            <InputLabel htmlFor="input-username">Username</InputLabel>
            <OutlinedInput
              id="input-username"
              aria-describedby="username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              required
              disabled={!editProfile}
              label="Username"
              color="button"
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="input-firstName">FirstName</InputLabel>
            <OutlinedInput
              id="input-firstName"
              aria-describedby="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
              required
              disabled={!editProfile}
              label="FirstName"
              color="button"
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="input-lastName">LastName</InputLabel>
            <OutlinedInput
              id="input-lastName"
              aria-describedby="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.currentTarget.value)}
              required
              disabled={!editProfile}
              label="LastName"
              color="button"
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="input-birthDate">BirthDate</InputLabel>
            <OutlinedInput
              id="input-birthDate"
              aria-describedby="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.currentTarget.value)}
              required
              disabled={!editProfile}
              label="BirthDate"
              color="button"
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="input-email">Email</InputLabel>
            <OutlinedInput
              id="input-email"
              aria-describedby="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
              disabled={!editProfile}
              label="Email"
              color="button"
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="input-phone">Phone</InputLabel>
            <OutlinedInput
              id="input-phone"
              aria-describedby="phone"
              value={phone}
              onChange={(e) => setPhone(e.currentTarget.value)}
              required
              disabled={!editProfile}
              label="Phone"
              color="button"
            />
          </FormControl>
          <Button
            variant="contained"
            color="button"
            type="submit"
            value="Submit"
            disabled={!editProfile}
          >
            <Typography variant="button">Save Changes</Typography>
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default ProfilePage;
