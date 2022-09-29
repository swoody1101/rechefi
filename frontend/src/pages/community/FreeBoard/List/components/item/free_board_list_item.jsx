import { ListItemButton } from "@mui/material";
import React from "react";
import { Palette } from "../../../../../../common/styles/palette";
import FreeBoardListItemBottomInfo from "./free_board_list_item_bottom_info";
import FreeBoardListItemTitle from "./free_board_list_item_title";

function FreeBoardListItem({ post, isNotice, isLast, onClick }) {
  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        borderBottom: isLast ? 0 : 1,
        borderColor: Palette.white2,
        pt: 1.6,
        px: 1,
      }}
    >
      <FreeBoardListItemTitle
        postTitle={post.title}
        nComment={post.comments_count}
        isNotice={isNotice}
      />
      <FreeBoardListItemBottomInfo
        postDate={post.date}
        postWriter={post.nickname}
        postViews={post.views}
      />
    </ListItemButton>
  );
}

export default FreeBoardListItem;
