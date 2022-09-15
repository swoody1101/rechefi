import { Box, TextField } from "@mui/material";
import React from "react";
import { Palette } from "../../../../common/styles/palette";

function RecipeWriteTitleInput({
  value,
  onChange,
  placeholder,
  validation,
  errorMessage,
}) {
  const isError = () => {
    // dismiss value at first
    if (value === null) return false;
    // validation ok
    if (validation()) return false;
    return true;
  };

  return (
    <Box sx={{ display: "flex", mt: 1, mx: 2 }}>
      <TextField
        variant="standard"
        value={value}
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
            fontSize: "1.2rem",
          },
        }}
        inputProps={{
          style: {
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: Palette.black3,
          },
        }}
      />
    </Box>
  );
}

export default RecipeWriteTitleInput;
