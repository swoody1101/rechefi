import { Chip } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import React from "react";

function RecipeListItemLikeBtn({ likes }) {
  return (
    <Chip
      icon={<ThumbUpIcon />}
      label={likes}
      size={"small"}
      variant="outlined"
      sx={{ mt: 0.5, pl: 1, fontSize: "1rem" }}
    />
  );
}

export default RecipeListItemLikeBtn;
