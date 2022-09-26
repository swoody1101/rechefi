import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Box,
  Container,
  FormControl,
  Grid,
} from "@mui/material";
import NicknameInputElement from "../components/nickname_input_element";
import PasswordInputElement from "../components/password_input_element";
import ConfirmPasswordInputElement from "../components/confim_password_input_element";
import ProfileModifyIntroduce from "./components/profile_modify_introduce";
import {
  checkNicknameThunk,
  porfileModifyThunk,
} from "../../../store/module/accountReducer";

const ProfileModifyPage = () => {
  const loginInfo = useSelector((store) => store.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState(loginInfo.nickname);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [introduce, setIntroduce] = useState(
    loginInfo.introduce ? loginInfo.introduce : ""
  );
  const [myImgae, setMyImage] = useState(
    loginInfo.img_url ? loginInfo.img_url : ""
  );

  const nicknameCheck = () => {
    if (nickname === loginInfo.nickname) {
      return true;
    }
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return false;
    }
    if (!checkNicknameThunk(nickname)) {
      return false;
    }
    return true;
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== rePassword) {
      alert("비밀번호가 일치하지 않습니다.");
      setPassword("");
      setRePassword("");
      return;
    }

    // nicknameCheck() 백엔드 수정 중
    // if (nicknameCheck()) {
    //   alert("사용 불가능한 닉네임입니다.");
    //   setNickname(loginInfo.nickname);
    //   return;
    // }

    // 이미지 추가 필요
    const profileInfo = {
      nickname: nickname,
      about_me: introduce,
      password: password,
      img_url: null,
    };
    dispatch(porfileModifyThunk(profileInfo));
    navigate(`/mypage`);
  };

  return (
    <Container>
      <Box
        component="form"
        noValidate
        onSubmit={formSubmitHandler}
        sx={{ mt: 2 }}
      >
        <FormControl
          component="fieldset"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              mx: "auto",
            }}
          ></Avatar>
          <Grid container spacing={2} marginTop="20px">
            <NicknameInputElement value={nickname} setValue={setNickname} />
            <PasswordInputElement value={password} setValue={setPassword} />
            <ConfirmPasswordInputElement
              value={rePassword}
              setValue={setRePassword}
            />
            <ProfileModifyIntroduce
              value={introduce}
              setValue={setIntroduce}
            ></ProfileModifyIntroduce>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 2, background: "" }}
          >
            수정
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};

export default ProfileModifyPage;
