import { Box, Typography } from "@mui/material";
import React from "react";
import { Palette } from "../../../../../common/styles/palette";
import FreeBoardDetailUserAvartar from "./free_board_detail_user_avartar";

function FreeBoardDetailPostInfo({
  userEmail,
  userImage,
  userNickname,
  postDate,
  postViews,
  style,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        ...style,
      }}
    >
      <FreeBoardDetailUserAvartar
        email={userEmail}
        imageLink={userImage}
        nickname={userNickname}
      />
      <Typography color={Palette.gray2} fontSize={"0.8rem"}>
        조회 {postViews.toLocaleString()} &nbsp;&nbsp;
        {new Date(postDate).toLocaleString()}
      </Typography>
    </Box>
  );
}

FreeBoardDetailPostInfo.defaultProps = {
  userImage: "",
  userNickname: "작성자 불러오기 실패",
  postViews: 0,
  postDate: "0000-00-00",
};

export default FreeBoardDetailPostInfo;
