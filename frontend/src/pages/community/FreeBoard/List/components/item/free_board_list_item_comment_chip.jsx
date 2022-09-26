import { Avatar } from "@mui/material";
import React from "react";
import { Palette } from "../../../../../../common/styles/palette";

function FreeBoardListItemCommentChip({ nComment }) {
  return (
    <Avatar
      sx={{
        bgcolor: Palette.white2,
        color: Palette.black2,
        fontSize: "1rem",
        width: "2rem",
        height: "2rem",
      }}
    >
      {nComment}
    </Avatar>
  );
}

export default FreeBoardListItemCommentChip;
