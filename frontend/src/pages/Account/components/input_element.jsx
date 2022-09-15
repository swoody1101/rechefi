import React, { useState } from "react";

import { Grid, TextField } from "@mui/material";
const InputElement = (props) => {
  const id = props.label;
  const label = props.label;
  const type = props.type;
  const value = props.value;
  const setValue = props.setValue;
  const defaultText = props.defaultText;

  const [helperText, setHelperText] = useState(defaultText);

  const inputChangeHandler = (event) => {
    setValue(event.target.value);

    if (event.target.value === "") {
      setHelperText(defaultText);
    } else {
      setHelperText("");
    }
  };

  return (
    <Grid item xs={12}>
      <TextField
        required
        fullWidth
        id={id}
        label={label}
        type={type}
        variant="outlined"
        helperText={helperText}
        value={value}
        onChange={inputChangeHandler}
      />
    </Grid>
  );
};

export default InputElement;
