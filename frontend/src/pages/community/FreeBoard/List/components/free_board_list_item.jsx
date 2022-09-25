import { Box } from "@mui/material";
import React from "react";
import { Palette } from "../../../../../common/styles/palette";
import FreeBoardListItemBottomInfo from "./free_board_list_item_bottom_info";
import FreeBoardListItemTitle from "./free_board_list_item_title";

function FreeBoardListItem({ post }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        borderBottom: 1,
        borderColor: Palette.gray2,
      }}
    >
      <FreeBoardListItemTitle />
      <FreeBoardListItemBottomInfo
        postDate={post.date}
        postWriter={post.member_nickname}
      />
    </Box>
  );
}

export default FreeBoardListItem;
