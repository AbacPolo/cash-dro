import React, { useState } from "react";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, getUserProfileInfo } from "../loginPage/logInPageSlice";
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { updateProfileInfo } from "./profilePageSlice";

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

  console.log("userProfile", userProfile);
  console.log("userInfo", userInfo);

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
    <div className="ProfilePage_Container">
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
            <Input
              id="input-username"
              aria-describedby="username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              required
              disabled={!editProfile}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="input-firstName">FirstName</InputLabel>
            <Input
              id="input-firstName"
              aria-describedby="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
              required
              disabled={!editProfile}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="input-lastName">LastName</InputLabel>
            <Input
              id="input-lastName"
              aria-describedby="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.currentTarget.value)}
              required
              disabled={!editProfile}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="input-birthDate">BirthDate</InputLabel>
            <Input
              id="input-birthDate"
              aria-describedby="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.currentTarget.value)}
              required
              disabled={!editProfile}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="input-email">Email</InputLabel>
            <Input
              id="input-email"
              aria-describedby="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
              disabled={!editProfile}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="input-phone">Phone</InputLabel>
            <Input
              id="input-phone"
              aria-describedby="phone"
              value={phone}
              onChange={(e) => setPhone(e.currentTarget.value)}
              required
              disabled={!editProfile}
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
    </div>
  );
}

export default ProfilePage;
