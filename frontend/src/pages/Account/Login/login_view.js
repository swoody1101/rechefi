import React, { useState } from "react";

import {
  Box,
  Button,
  createTheme,
  Container,
  FormControl,
  Grid,
  ThemeProvider,
} from "@mui/material";

import InputElement from "../components/input_element";

const LoginView = () => {
  const theme = createTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box
          component="form"
          noValidate
          onSubmit={formSubmitHandler}
          sx={{ mt: 10 }}
        >
          <FormControl component="fieldset" variant="standard">
            <Grid container spacing={2}>
              <InputElement
                label="이메일"
                type="text"
                value={email}
                setValue={setEmail}
              />
              <InputElement
                label="비밀번호"
                type="password"
                value={password}
                setValue={setPassword}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              size="large"
              sx={{ mt: 10 }}
            >
              로그인
            </Button>
            <Button>회원가입</Button>
            <Button>비밀번호 찾기</Button>
          </FormControl>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginView;
