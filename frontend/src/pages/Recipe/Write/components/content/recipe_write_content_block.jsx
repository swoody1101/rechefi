import {
  Box,
  ButtonGroup,
  IconButton,
} from "@mui/material";
import React from "react";
import { Palette } from "../../../../../common/styles/palette";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Clear";

function RecipeWriteContentBlock({
  index,
  children,
  onIndexUp,
  onIndexDown,
  onDelete,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: Palette.mainColor1,
        borderRadius: 2,
        m: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          background: Palette.mainColor3,
          justifyContent: "flex-end",
          borderRadius: "3px 3px 0 0",
        }}
      >
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
          size="small"
        >
          <IconButton
            size="small"
            sx={{ p: 0 }}
            onClick={() => onIndexDown(index)}
          >
            <ArrowDropUpIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{ p: 0 }}
            onClick={() => onIndexUp(index)}
          >
            <ArrowDropDownIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{ p: 0 }}
            onClick={() => onDelete(index)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </ButtonGroup>
      </Box>
      {children}
    </Box>
  );
}

RecipeWriteContentBlock.defaultProps = {
  index: null,
};

export default RecipeWriteContentBlock;
