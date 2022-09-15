import EditIcon from "@mui/icons-material/Edit";
import { Fab } from "@mui/material";
import React from "react";

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
      }}
    >
      <EditIcon />
    </Fab>
  );
}

export default RecipeListFab;
