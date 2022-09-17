import {
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useState } from "react";
import RecipeWriteBox from "./recipe_write_box";
import AddIcon from "@mui/icons-material/Add";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Palette } from "../../../../common/styles/palette";

function RecipeWriteAddCotentBar({ addContent }) {
  const [contentType, setContentType] = useState("text");

  const handleType = (event, afterValue) => {
    if (afterValue !== null) {
      setContentType(afterValue);
    }
  };

  return (
    <RecipeWriteBox
      styles={{
        display: "flex",
        alignContent: "center",
        justifyContent: "space-between",
      }}
    >
      <IconButton
        onClick={() => addContent(contentType)}
        sx={{ p: 0.5 }}
      >
        <AddIcon />
      </IconButton>
      {/* select content type */}
      <ToggleButtonGroup
        value={contentType}
        exclusive
        onChange={handleType}
      >
        <ToggleButton
          value="text"
          sx={{
            background: "",
            border: 0,
            borderRadius: "30%",
            p: 0.5,
            color: Palette.gray2,
            "&.Mui-selected, &.Mui-selected:hover": {
              background: Palette.mainColor1,
              color: Palette.black3,
            },
          }}
        >
          <PostAddIcon />
        </ToggleButton>
        <ToggleButton
          value="image"
          sx={{
            background: "",
            border: 0,
            borderRadius: "20%",
            p: 0.5,
            color: Palette.gray2,
            "&.Mui-selected, &.Mui-selected:hover": {
              background: Palette.mainColor1,
              color: Palette.black3,
            },
          }}
        >
          <AddPhotoAlternateIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </RecipeWriteBox>
  );
}

export default RecipeWriteAddCotentBar;
