import { Typography } from "@mui/material";
import React from "react";
import { Palette } from "../../../../../../common/styles/palette";

function FreeBoardListItemBottomInfo({
  postWriter,
  postDate,
  postViews,
  style,
}) {
  return (
    <Typography
      sx={{
        fontSize: "0.7rem",
        color: Palette.gray2,
        width: "100%",
        ...style,
      }}
    >
      {postWriter} {" - "} {new Date(postDate).toLocaleString()} {" - 조회수 :"}{" "}
      {postViews.toLocaleString()}
    </Typography>
  );
}

FreeBoardListItemBottomInfo.defaultProps = {
  postWriter: "작성자",
  postDate: "0000-00-00",
  postViews: 0,
};

export default FreeBoardListItemBottomInfo;
