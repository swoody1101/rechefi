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
import {
  emailValidationThunk,
  nicknameValidationThunk,
  signupThunk,
} from "../../../store/module/accountReducer";
import InputElement from "../components/input_element";
import { Warn } from "../../../common/components/sweatAlert";

const SignUp = () => {
  const theme = createTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [availableEmail, setAvailableEmail] = useState(false);
  const [availableNickname, setAvailableNickname] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailCheck = () => {
    if (!email) {
      Warn("이메일을 확인해주세요.");
      return false;
    }
    return true;
  };

  const passwordCheck = () => {
    if (!password) {
      Warn("비밀번호를 확인해주세요.");
      return false;
    }
    if (password !== rePassword) {
      Warn("비밀번호가 일치하지 않습니다.");
      return false;
    }
    return true;
  };

  const nicknameCheck = () => {
    if (!nickname) {
      Warn("닉네임을 입력해주세요.");
      return false;
    }
    return true;
  };

  const emailValidation = (prop) => {
    dispatch(emailValidationThunk(prop))
      .unwrap()
      .then((res) => {
        if (res.duplicate) {
          Warn("이미 사용중인 이메일입니다.");
          setAvailableEmail(false);
        }
        setAvailableEmail(true);
      });
  };

  const nicknameValidation = (prop) => {
    dispatch(nicknameValidationThunk(prop))
      .unwrap()
      .then((res) => {
        if (res.duplicate) {
          Warn("이미 사용중인 닉네임입니다.");
          setAvailableNickname(false);
        }
        setAvailableNickname(true);
      });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!emailCheck() || !passwordCheck() || !nicknameCheck()) {
      return;
    }

    emailValidation(email);
    if (!availableEmail) {
      setEmail("");
      return;
    }

    nicknameValidation(nickname);
    if (!availableNickname) {
      setNickname("");
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
        Warn("인증 링크가 발송되었습니다. 이메일을 확인해 주세요.");
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
