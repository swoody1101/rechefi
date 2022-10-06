import { Chip } from "@mui/material";
import React from "react";
import { Palette } from "../../../../../../common/styles/palette";

function RecipeListFilterTagChip({ tag, onClick }) {
  return (
    <Chip
      key={tag.id}
      label={tag.name}
      size="small"
      sx={{
        mx: 0.5,
        fontSize: "0.75rem",
        fontWeight: "bold",
        background: tag.selected ? Palette.mainColor3 : Palette.gray1,
        // erase opacity animation
        "&:hover, &:focus": {
          backgroundColor: tag.selected ? Palette.mainColor3 : Palette.gray1,
        },
      }}
      onClick={onClick}
    />
  );
}

export default RecipeListFilterTagChip;
