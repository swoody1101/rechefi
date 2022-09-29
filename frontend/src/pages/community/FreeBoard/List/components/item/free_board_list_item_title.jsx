import { Box, Typography } from "@mui/material";
import React from "react";
import FreeBoardListItemCommentChip from "./free_board_list_item_comment_chip";
import FreeBoardListNoticeChip from "../notice/free_board_list_notice_chip";

function FreeBoardListItemTitle({ postTitle, nComment, isNotice }) {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      {isNotice ? <FreeBoardListNoticeChip /> : ""}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          ml: isNotice ? 1 : 0,
        }}
      >
        <Typography sx={{ fontSize: "1.1rem" }}>{postTitle}</Typography>
        <FreeBoardListItemCommentChip nComment={nComment} />
      </Box>
    </Box>
  );
}

export default FreeBoardListItemTitle;
