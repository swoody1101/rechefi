import { Box } from "@mui/material";
import React from "react";
import { Palette } from "../../../../../common/styles/palette";
import RecipeWriteBottombarButton from "./recipe_write_bottombar_btn";

function RecipeWriteBottombar({ confirmDisabled, onConfirm, onCancel }) {
  return (
    <Box
      sx={{
        m: 2,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <RecipeWriteBottombarButton
        disabled={confirmDisabled}
        onClick={onConfirm}
        color={Palette.mainColor4}
      >
        완료
      </RecipeWriteBottombarButton>
      <RecipeWriteBottombarButton onClick={onCancel} color={Palette.gray3}>
        취소
      </RecipeWriteBottombarButton>
    </Box>
  );
}

export default RecipeWriteBottombar;
