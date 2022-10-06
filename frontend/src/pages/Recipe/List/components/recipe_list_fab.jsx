import EditIcon from "@mui/icons-material/Edit";
import { Fab } from "@mui/material";
import React from "react";
import { Palette } from "../../../../common/styles/palette";

function RecipeListFab({ onClick }) {
  return (
    <Fab
      aria-label="edit"
      onClick={onClick}
      sx={{
        position: "fixed",
        left: "auto",
        right: 20,
        bottom: 20,
        top: "auto",
        zIndex: 10,
        background: Palette.mainColor3,
      }}
    >
      <EditIcon />
    </Fab>
  );
}

export default RecipeListFab;
