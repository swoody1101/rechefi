import { IconButton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import RecipeWriteBox from "./recipe_write_box";
import AddIcon from "@mui/icons-material/Add";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Palette } from "../../../../common/styles/palette";

function RecipeWriteAddCotentBar({ addContent }) {
  const [contentType, setContentType] = useState("text");

  const handleType = (event, afterValue) => {
    // text or image
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
      <IconButton onClick={() => addContent(contentType)} sx={{ p: 0.5 }}>
        <AddIcon />
      </IconButton>
      {/* select content type */}
      <ToggleButtonGroup value={contentType} exclusive onChange={handleType}>
        {/* it can be component because of MUI */}
        <ToggleButton
          value="text"
          disableRipple={true}
          sx={{
            background: "",
            border: 0,
            borderRadius: "30%",
            py: 0.5,
            color: Palette.gray2,
            "&.Mui-selected, &.Mui-selected:hover": {
              background: Palette.mainColor1,
              color: Palette.black3,
            },
            "&.MuiToggleButton-root": {
              transition: "",
            },
          }}
        >
          <PostAddIcon />
        </ToggleButton>
        <ToggleButton
          value="image"
          disableRipple={true}
          sx={{
            background: "",
            border: 0,
            borderRadius: "30%",
            py: 0.5,
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
