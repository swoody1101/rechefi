import { TextField } from "@mui/material";
import React from "react";
import { Palette } from "../../../../../common/styles/palette";

function RecipeWriteIngredInput({
  label,
  value,
  setValue,
  styles,
  onBlur,
}) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      sx={{
        ...styles,
        // change focused color
        "& label.Mui-focused": {
          color: Palette.mainColor4,
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: Palette.mainColor4,
          },
        },
      }}
      size="small"
      inputProps={{
        style: {
          color: Palette.black2,
        },
      }}
    />
  );
}

export default RecipeWriteIngredInput;
