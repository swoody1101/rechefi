import { Button } from "@mui/material";
import React from "react";
import { Palette } from "../../../../../common/styles/palette";

function RecipeFilterBtn({ Content, onClick }) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        mx: 1,
        background: Palette.mainColor5,
        fontWeight: "bold",
      }}
    >
      {Content}
    </Button>
  );
}

export default RecipeFilterBtn;
