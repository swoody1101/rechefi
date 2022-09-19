import { Grid } from "@mui/material";
import React from "react";

import DefaultInputElement from "./default_input_element";
import regex from "../../../utils/regex";

const ConfirmPasswordInputElement = () => {
  const EMPTY_PASSWORD = "비밀번호를 입력해주세요.";
  const VAILD_PASSWORD = "";
  const WRONG_PASSWORD = "비밀번호가 일치하지 않습니다.";

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
        label="비밀번호"
        type="password"
        value=""
        emptyValueText={EMPTY_PASSWORD}
        validValueText={VAILD_PASSWORD}
        wrongValueText={WRONG_PASSWORD}
        inputValidation={passwordValidation}
      ></DefaultInputElement>
    </Grid>
  );
};

export default ConfirmPasswordInputElement;
