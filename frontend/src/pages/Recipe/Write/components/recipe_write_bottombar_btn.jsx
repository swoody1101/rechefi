import { Button } from "@mui/material";
import React from "react";

function RecipeWriteBottombarButton({
  onClick,
  color,
  children,
}) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        fontWeight: "bold",
        backgroundColor: color,
        "&:focus, &:hover": {
          backgroundColor: color,
        },
      }}
    >
      {children}
    </Button>
  );
}

RecipeWriteBottombarButton.defaultProps = {
  color: "#363636",
};

export default RecipeWriteBottombarButton;
