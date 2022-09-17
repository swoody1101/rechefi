import { Box } from "@mui/material";
import React from "react";
import { Palette } from "../../../../common/styles/palette";

function RecipeWriteBox({ children, styles }) {
  return (
    <Box
      sx={{
        ...styles,
        mt: 2,
        mx: 2,
        p: 1,
        borderRadius: 2,
        backgroundColor: Palette.mainColor1,
      }}
    >
      {children}
    </Box>
  );
}

export default RecipeWriteBox;
