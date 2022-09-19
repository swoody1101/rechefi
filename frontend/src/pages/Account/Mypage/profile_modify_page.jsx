import {
  Avatar,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";

import NicknameInputElement from "../components/nickname_input_element";
import PasswordInputElement from "../components/password_input_element";
import ConfirmPasswordInputElement from "../components/confim_password_input_element";

const ProfileModifyPage = () => {
  const formSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <FormControl
        onSubmit={formSubmitHandler}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Avatar
          sx={{
            width: 140,
            height: 140,
            mx: "auto",
            marginTop: "50px",
          }}
        ></Avatar>
        <Grid container spacing={2} marginTop="20px">
          <NicknameInputElement />
          <PasswordInputElement />
          <ConfirmPasswordInputElement />
          <TextField></TextField>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 10, background: "" }}
        >
          수정
        </Button>
      </FormControl>
    </Container>
  );
};

export default ProfileModifyPage;
