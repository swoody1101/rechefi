import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createTheme,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  ThemeProvider,
} from "@mui/material";
import { signupThunk } from "../../../store/module/accountReducer";
import InputElement from "../components/input_element";
import { Warn } from "../../../common/components/sweatAlert";

const SignUp = () => {
  const theme = createTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [nickname, setNickname] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailCheck = () => {
    if (!email) {
      alert("이메일을 확인해주세요.");
      return false;
    }
    return true;
  };

  const passwordCheck = () => {
    if (!password) {
      alert("비밀번호를 확인해주세요.");
      return false;
    }
    if (password !== rePassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }
    return true;
  };

  const nicknameCheck = () => {
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return false;
    }
    return true;
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!emailCheck() || !passwordCheck() || !nicknameCheck()) {
      return;
    }

    const signupInfo = {
      email: email,
      password: password,
      nickname: nickname,
    };

    dispatch(signupThunk(signupInfo))
      .unwrap()
      .then(() => {
        Warn("이메일을 확인해주세요.");
        navigate(`/login`);
      })
      .catch((err) => {
        console.log(err);
      });
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
                defaultText="이메일을 입력해주세요."
              />
              <InputElement
                label="비밀번호"
                type="password"
                value={password}
                setValue={setPassword}
                defaultText="비밀번호를 입력해주세요."
              />
              <InputElement
                label="비밀번호 확인"
                type="password"
                value={rePassword}
                setValue={setRePassword}
                defaultText="비밀번호를 한번 더 입력해주세요."
              />
              <InputElement
                label="닉네임"
                type="text"
                value={nickname}
                setValue={setNickname}
                defaultText="닉네임을 입력해주세요."
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              size="large"
              sx={{ mt: 10 }}
            >
              회원가입
            </Button>
          </FormControl>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
