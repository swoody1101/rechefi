import { Avatar } from "@mui/material";
import React from "react";
import { Palette } from "../../../../../../common/styles/palette";

function FreeBoardListItemCommentChip({ nComment }) {
  return (
    <Avatar
      sx={{
        bgcolor: Palette.white1,
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

FreeBoardListItemCommentChip.defaultProps = {
  nComment: 0,
};

export default FreeBoardListItemCommentChip;
