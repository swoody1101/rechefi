import { Grid } from "@mui/material";
import React from "react";

import DefaultInputElement from "./default_input_element";
import regex from "../../../utils/regex";

const ConfirmPasswordInputElement = (props) => {
  const EMPTY_PASSWORD = "비밀번호를 입력해주세요.";
  const VAILD_PASSWORD = "";
  const WRONG_PASSWORD = "사용 불가능한 비밀번호입니다.";

  const accessEmpty = true;
  const rePassword = props.value;
  const setRePassword = props.setValue;

  const passwordValidation = (props) => {
    const regexCheck = regex.password;
    if (regexCheck.test(props)) {
      return true;
    }
    return false;
  };

  return (
    <Grid item xs={12}>
      <DefaultInputElement
        label="비밀번호 확인"
        type="password"
        accessEmpty={accessEmpty}
        value={rePassword}
        setValue={setRePassword}
        emptyValueText={EMPTY_PASSWORD}
        validValueText={VAILD_PASSWORD}
        wrongValueText={WRONG_PASSWORD}
        inputValidation={passwordValidation}
      ></DefaultInputElement>
    </Grid>
  );
};

export default ConfirmPasswordInputElement;
