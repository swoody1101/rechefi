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
        mt: 2,
        background: Palette.mainColor5,
        fontWeight: "bold",
        "&:focus, &:hover": {
          backgroundColor: Palette.mainColor5,
        },
      }}
    >
      {Content}
    </Button>
  );
}

export default RecipeFilterBtn;
