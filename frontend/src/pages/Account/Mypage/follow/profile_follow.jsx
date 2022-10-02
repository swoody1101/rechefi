import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, styled, Typography } from "@mui/material";

const ProfileFollow = (props) => {
  const email = props.email;
  const followerCount = props.follower;
  const followingCount = props.following;
  const navigate = useNavigate();

  const followerClickHandler = () => {
    navigate("/follower", { state: email });
  };
  const followingClickHandler = () => {
    navigate("/following", { state: email });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        marginTop: "20px",
        paddingTop: "5px",
        paddingBottom: "5px",
        borderBottom: 1,
        borderTop: 1,
        borderColor: "grey.500",
        marginBottom: "10px",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column" }}
        onClick={followerClickHandler}
      >
        <FollowTypography>팔로워</FollowTypography>
        <FollowCountTypography>{followerCount}</FollowCountTypography>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column" }}
        onClick={followingClickHandler}
      >
        <FollowTypography>팔로잉</FollowTypography>
        <FollowCountTypography>{followingCount}</FollowCountTypography>
      </Box>
    </Box>
  );
};

export default ProfileFollow;

const FollowTypography = styled(Typography)({
  color: "#E38B29",
  fontSize: "17px",
  fontWeight: "500",
});

const FollowCountTypography = styled(Typography)({
  textAlign: "center",
  fontSize: "17px",
  fontWeight: "500",
});
