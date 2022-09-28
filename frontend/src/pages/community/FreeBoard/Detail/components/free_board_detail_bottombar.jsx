import React from "react";
import { Palette } from "../../../../../common/styles/palette";
import { Box, Divider } from "@mui/material";
import BottombarButton from "../../../../Recipe/Write/components/bottombar/recipe_write_bottombar_btn";

function FreeBoardDetailBottombar({
  onListClick,
  onDeleteClick,
  onModifyClick,
  disabledCondition,
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Divider sx={{ mb: 1 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <BottombarButton
          onClick={onListClick}
          color={Palette.white1}
          style={{ color: Palette.black2 }}
        >
          목록
        </BottombarButton>

        {/* delete modify button */}
        <Box>
          <BottombarButton
            onClick={onModifyClick}
            color={Palette.white1}
            style={{ color: Palette.black2, mr: 1 }}
            disabled={disabledCondition()}
          >
            수정
          </BottombarButton>
          <BottombarButton
            onClick={onDeleteClick}
            color={Palette.white1}
            style={{ color: Palette.black2 }}
            disabled={disabledCondition()}
          >
            삭제
          </BottombarButton>
        </Box>
      </Box>
    </Box>
  );
}

export default FreeBoardDetailBottombar;
