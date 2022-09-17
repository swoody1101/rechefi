import { Box, TextField } from "@mui/material";
import React from "react";
import { Palette } from "../../../../common/styles/palette";

function RecipeWriteTitleInput({
  title,
  setValue,
  placeholder,
  validation,
  errorMessage,
}) {
  const isError = () => {
    // dismiss value at first
    if (title === null) return false;
    // validation ok
    if (validation()) return false;
    return true;
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Box sx={{ display: "flex", mt: 1, mx: 2 }}>
      <TextField
        variant="standard"
        value={title}
        placeholder={placeholder}
        onChange={onChange}
        error={isError()}
        helperText={isError() ? errorMessage : ""}
        fullWidth
        // for underline color
        sx={{
          "& .MuiInput-underline:after": {
            borderBottomColor: Palette.mainColor4,
          },
          "& ::placeholder": {
            fontWeight: "bold",
            fontSize: "1.4rem",
          },
        }}
        inputProps={{
          maxLength: 21,
          style: {
            fontWeight: "bold",
            fontSize: "1.4rem",
            color: Palette.black3,
          },
        }}
      />
    </Box>
  );
}

export default RecipeWriteTitleInput;
