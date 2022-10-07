import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Palette } from "../../../../../common/styles/palette";

function FreeBoardDetailUserAvartar({ email, nickname, imageLink, style }) {
  const navigate = useNavigate();

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
        sx={{ width: 36, height: 36, mr: 1 }}
      />
      <Typography
        color={Palette.black3}
        fontSize={"1.1rem"}
        sx={{ pb: 0.1 }}
        onClick={() => {
          navigate("/profile", { state: email });
        }}
      >
        {nickname}
      </Typography>
    </Box>
  );
}

export default FreeBoardDetailUserAvartar;
