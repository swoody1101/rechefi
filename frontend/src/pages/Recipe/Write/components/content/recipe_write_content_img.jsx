import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

function RecipeWriteContentImage({ link, thumbnail, setThumbnail }) {
  const [buttonDisplay, setButtonDisplay] = useState(false);

  return (
    <Box sx={{ position: "relative" }}>
      <img
        src={link}
        onMouseOver={() => {
          setButtonDisplay(true);
        }}
        onMouseOut={() => {
          setButtonDisplay(false);
        }}
        alt={link}
        style={{ width: "100%" }}
      />
      <Button
        variant={link === thumbnail ? "contained" : "outlined"}
        color="warning"
        sx={{
          position: "absolute",
          top: 5,
          left: 5,
          p: 0,
          borderRadius: 2,
          display: buttonDisplay ? "flex" : "none",
        }}
        translate="yes"
        onClick={() => {
          setThumbnail(link);
          setButtonDisplay(true);
        }}
      >
        <CheckIcon fontSize="20" />
        대표
      </Button>
    </Box>
  );
}

export default RecipeWriteContentImage;
