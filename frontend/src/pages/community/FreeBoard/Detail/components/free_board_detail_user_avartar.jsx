import { Avatar, Box, Link } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Palette } from "../../../../../common/styles/palette";

function FreeBoardDetailUserAvartar({
  email,
  nickname,
  imageLink,
  style,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        m: 0.5,
        mr: 2,
        ...style,
      }}
    >
      <Avatar
        alt={nickname}
        src={imageLink}
        sx={{ width: 32, height: 32, mr: 1 }}
      />
      <Link
        color={Palette.black3}
        fontSize={"1.1rem"}
        underline="hover"
        component={RouterLink}
        sx={{ pb: 0.1 }}
        // TODO : change with match implemented
        to={`/mypage`}
        state={{
          user_id: email,
        }}
      >
        {nickname}
      </Link>
    </Box>
  );
}

export default FreeBoardDetailUserAvartar;
