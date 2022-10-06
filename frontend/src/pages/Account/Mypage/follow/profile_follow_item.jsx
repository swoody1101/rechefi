import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Warn } from "../../../../common/components/sweatAlert";
import {
  loadFollowerListThunk,
  loadFollowingListThunk,
  profileFollowThunk,
} from "../../../../store/module/accountReducer";

const ProfileFollowItem = (props) => {
  const loginInfo = useSelector((store) => store.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [follow, setfollow] = useState();

  useEffect(() => {
    setfollow(props.isFollow);
  }, []);

  const profileTransitionHandler = () => {
    navigate("/profile", { state: props.email });
  };

  const followHandler = () => {
    setfollow(!follow);
    dispatch(profileFollowThunk(props.email))
      .unwrap()
      .then((res) => {
        Warn(res.detail);
      });
    dispatch(loadFollowerListThunk(props.email));
    dispatch(loadFollowingListThunk(props.email));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          paddingLeft: "20px",
        }}
      >
        <Avatar
          sx={{ width: 55, height: 55, marginRight: "10px" }}
          src={props.imgUrl}
        />
        <Box>
          <Typography
            onClick={profileTransitionHandler}
            sx={{ paddingTop: "5px", fontSize: 15 }}
          >
            {props.email}
          </Typography>
          <Typography sx={{ fontSize: 13 }}>{props.nickname}</Typography>
        </Box>
      </Box>
      {props.email === loginInfo.email ? (
        <></>
      ) : (
        <Box sx={{ "& button": { m: 2 } }}>
          {follow ? (
            <Button
              variant="contained"
              size="small"
              sx={{
                color: "white",
                backgroundColor: "#E38B29",
                "&:focus, &:hover": {
                  backgroundColor: "#E38B29",
                },
              }}
              onClick={() => {
                followHandler();
              }}
            >
              팔로잉
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              sx={{
                color: "white",
                backgroundColor: "#E38B29",
                "&:focus, &:hover": {
                  backgroundColor: "#E38B29",
                },
              }}
              onClick={() => {
                followHandler();
              }}
            >
              팔로우
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ProfileFollowItem;
