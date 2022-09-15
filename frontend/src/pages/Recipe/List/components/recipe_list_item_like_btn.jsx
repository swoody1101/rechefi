import React from "react";
import { Chip } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

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

RecipeListItemLikeBtn.defaultProps = {
  likes: 0,
};

export default RecipeListItemLikeBtn;
