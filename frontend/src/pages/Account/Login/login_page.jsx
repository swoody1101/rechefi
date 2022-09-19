import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../../store/Account/account";

import {
  Box,
  Button,
  createTheme,
  Container,
  FormControl,
  Grid,
  Stack,
  styled,
  ThemeProvider,
  TextField,
} from "@mui/material";
import { Palette } from "../../../common/styles/palette";

const LoginView = () => {
  const theme = createTheme();
  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const dispatch = useDispatch();

  const loginHandler = (event) => {
    event.preventDefault();
    const email = refEmail.current.value;
    const password = refPassword.current.value;

    const loginInfo = new FormData();
    loginInfo.append("username", email);
    loginInfo.append("password", password);

    console.log("loginInfo: " + loginInfo.get("username"));
    console.log("loginInfo: " + loginInfo.get("password"));

    dispatch(loginThunk(loginInfo));

    // console.log(email);
    // console.log(password);

    // const user = JSON.parse(localStorage.getItem("userObj"));
    // console.log(user);
    // if (user.email === email && user.password === password) {
    //   console.log("로그인 성공");
    //   refEmail.current.value = "";
    //   refPassword.current.value = "";
    //   return;
    // }
    // console.log("아이디와 비밀번호 확인해줍쇼");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box
          component="form"
          noValidate
          onSubmit={loginHandler}
          sx={{ mt: 10 }}
        >
          <FormControl component="fieldset" variant="standard">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="이메일"
                  type="text"
                  inputRef={refEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="비밀번호"
                  type="password"
                  inputRef={refPassword}
                />
              </Grid>
            </Grid>
            <LoginButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 10 }}
            >
              로그인
            </LoginButton>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <LinkButton>회원가입</LinkButton>
              <LinkButton>비밀번호 찾기</LinkButton>
            </Stack>
          </FormControl>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginView;

const LoginButton = styled(Button)({
  background: Palette.mainColor5,
});

const LinkButton = styled(Button)({
  variant: "text",
  color: "gray",
});
