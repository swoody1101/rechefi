import React, { useState } from "react";

import { TextField } from "@mui/material";

const DefaultInputElement = (props) => {
  const id = props.label;
  const label = props.label;
  const type = props.type;

  const EMPTY_VALUE = props.emptyValueText;
  const VALID_VALUE = props.validValueText;
  const WRONG_VALUE = props.wrongValueText;

  const inputValidation = props.inputValidation;

  const value = props.value;
  const setValue = props.setValue;

  const [isValue, setIsValue] = useState();
  const [helperText, setHelperText] = useState("");

  const inputChangeHandler = (event) => {
    setValue(event.target.value);
    if (event.target.value === "") {
      setIsValue(false);
      setHelperText(EMPTY_VALUE);
    } else {
      setIsValue(true);
      setHelperText("");
    }
  };

  const onBlurHandler = () => {
    if (isValue && inputValidation(value)) {
      setHelperText(VALID_VALUE);
      return;
    }
    setHelperText(WRONG_VALUE);
  };

  return (
    <TextField
      required
      fullWidth
      variant="outlined"
      id={id}
      label={label}
      type={type}
      value={value}
      helperText={helperText}
      onChange={inputChangeHandler}
      onBlur={onBlurHandler}
    />
  );
};

export default DefaultInputElement;
