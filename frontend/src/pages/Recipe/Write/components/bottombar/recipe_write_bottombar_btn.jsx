import { Button } from "@mui/material";
import React from "react";

function RecipeWriteBottombarButton({
  onClick,
  color,
  children,
  disabled,
  style,
}) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      sx={{
        fontWeight: "bold",
        backgroundColor: color,
        "&:focus, &:hover": {
          backgroundColor: color,
        },
        ...style,
      }}
    >
      {children}
    </Button>
  );
}

RecipeWriteBottombarButton.defaultProps = {
  color: "#363636",
  disabled: false,
};

export default RecipeWriteBottombarButton;
