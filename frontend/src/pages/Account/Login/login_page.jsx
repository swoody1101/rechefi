import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { loginThunk } from "../../../store/module/accountReducer";
import { Palette } from "../../../common/styles/palette";
import {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
} from "../../../utils/CustomConst";
import { Warn } from "../../../common/components/sweatAlert";

const LoginView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = createTheme();
  const refEmail = useRef(null);
  const refPassword = useRef(null);

  const loginHandler = (event) => {
    event.preventDefault();

    const email = refEmail.current.value;
    const password = refPassword.current.value;

    if (email === "") {
      Warn("이메일을 입력해주세요.");
      return;
    }
    if (password === "") {
      Warn("비밀번호를 입력해주세요.");
      return;
    }

    dispatch(loginThunk({ email, password }))
      .unwrap()
      .then((res) => {
        if (res.status === OK) {
          navigate("/");
        } else {
          Warn("적절한 요청이 아닙니다.");
          refEmail.current.value = "";
          refPassword.current.value = "";
        }
      })
      .catch((err) => {
        if (err.response.status === BAD_REQUEST) {
          Warn("없는 아이디 이거나 잘못된 비밀번호입니다.");
        } else if (err.response.status === NOT_FOUND) {
          Warn("없는 아이디 이거나 잘못된 비밀번호입니다.");
        } else if (err.response.status === CONFLICT) {
          Warn("이미 중복으로 접속된 아이디입니다.");
        }
      });
  };

  const signUpButtonClickHandler = (event) => {
    navigate(`/signup`);
  };

  const findPasswordClickHandler = (event) => {
    navigate(`/new-password`);
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
              <LinkButton onClick={signUpButtonClickHandler}>
                회원가입
              </LinkButton>
              <LinkButton onClick={findPasswordClickHandler}>
                비밀번호 찾기
              </LinkButton>
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
