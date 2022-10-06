import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import DefaultInputElement from "./default_input_element";
import regex from "../../../utils/regex";

const NicknameInputElement = (props) => {
  const loginInfo = useSelector((store) => store.account);
  const EMPTY_NICKNAME = "닉네임을 입력해주세요.";
  const VAILD_NICKNAME = "사용 가능한 닉네임입니다.";
  const WRONG_NICKNAME = "사용 불가능한 닉네임입니다.";

  const nickname = props.value;
  const setNickname = props.setValue;

  const nicknameValidation = (props) => {
    if (props === loginInfo.nickname) {
      return true;
    }
    const regexCheck = regex.nickname;
    if (regexCheck.test(props)) {
      return true;
    }
    return false;
  };

  return (
    <Grid item xs={12}>
      <DefaultInputElement
        label="닉네임"
        type="text"
        value={nickname}
        setValue={setNickname}
        emptyValueText={EMPTY_NICKNAME}
        validValueText={VAILD_NICKNAME}
        wrongValueText={WRONG_NICKNAME}
        inputValidation={nicknameValidation}
      ></DefaultInputElement>
    </Grid>
  );
};

export default NicknameInputElement;
