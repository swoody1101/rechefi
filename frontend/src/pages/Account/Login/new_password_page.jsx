import React, { useState } from "react";

import {
  Button,
  Container,
  Grid,
  Stack,
  styled,
  TextField,
} from "@mui/material";

import regex from "../components/regex";

const NewPassword = () => {
  const [email, setEmail] = useState("");

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const sumbitHandler = () => {
    const regexCheck = regex.email;
    if (regexCheck.test(email)) {
    } else {
      alert("이메일 형식으로 입력해주세요.");
    }
    setEmail("");
  };

  return (
    <MainContainer>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            label="이메일 주소"
            name="email"
            value={email}
            onChange={emailHandler}
            autoComplete="email"
            autoFocus
            required
            fullWidth
          />
          <SendButton
            type="submit"
            variant="contained"
            onClick={sumbitHandler}
            sx={{ mt: 3, mb: 2 }}
            fullWidth
          >
            새로운 비밀번호 발급
          </SendButton>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <LinkButton>회원가입</LinkButton>
            <LinkButton>로그인</LinkButton>
          </Stack>
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default NewPassword;

const MainContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "80vh",
});

const SendButton = styled(Button)({
  background: "#E38B29",
});

const LinkButton = styled(Button)({
  variant: "text",
  color: "gray",
});
