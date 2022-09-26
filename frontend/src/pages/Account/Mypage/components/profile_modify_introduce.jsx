import { Grid, TextField } from "@mui/material";
import React from "react";

const ProfileModifyIntroduce = (props) => {
  const introduce = props.value;
  const setIntroduce = props.setValue;

  const introduceChangeHandler = (event) => {
    setIntroduce(event.target.value);
  };

  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        variant="outlined"
        label="자기소개"
        multiline
        minRows={4}
        maxRows={4}
        value={introduce}
        onChange={introduceChangeHandler}
      ></TextField>
    </Grid>
  );
};

export default ProfileModifyIntroduce;
