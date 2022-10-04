import React, { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Avatar, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { profileFollowThunk } from "../../../../store/module/accountReducer";
import { useEffect } from "react";

const ProfileIntroduce = (props) => {
  const loginInfo = useSelector((store) => store.account);
  const dispatch = useDispatch();
  const [follow, setfollow] = useState(props.isFollow);
  const imgUrl = props.imgUrl;
  const email = props.email;
  const nickname = props.nickname;
  const introduce = props.introduce;

  useEffect(() => {
    setfollow(props.isFollow);
  }, [props.isFollow]);

  const followHandler = () => {
    dispatch(profileFollowThunk(props.email))
      .unwrap()
      .then((res) => {
        alert(res.detail);
      });
    setfollow(!follow);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      <Avatar
        src={imgUrl}
        sx={{
          width: 140,
          height: 140,
          mx: "auto",
          border: "2px solid #aaaaaa",
        }}
      ></Avatar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Typography
          align="center"
          variant="h5"
          sx={{ verticalAlign: "middle" }}
        >
          {nickname}
        </Typography>
        {email === loginInfo.email ? (
          <></>
        ) : follow ? (
          <CheckCircleOutlineIcon onClick={followHandler} />
        ) : (
          <PersonAddAlt1Icon onClick={followHandler} />
        )}
      </Box>
      <Typography
        textAlign={"center"}
        variant="body1"
        marginLeft={3}
        marginRight={3}
      >
        {introduce ? introduce : "소개 글이 없습니다."}
      </Typography>
    </Box>
  );
};

export default ProfileIntroduce;
