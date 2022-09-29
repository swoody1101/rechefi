import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { loadFollowerListThunk } from "../../../../store/module/accountReducer";
import ProfileFollowItem from "./profile_follow_item";

const ProfileFollowerList = () => {
  const loginInfo = useSelector((store) => store.account);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [followerList, setfollowerList] = useState([]);

  useEffect(() => {
    dispatch(loadFollowerListThunk(loginInfo.email));
    dispatch(loadFollowerListThunk(state))
      .unwrap()
      .then((res) => {
        setfollowerList([...res.follower]);
      });
  }, []);

  const isFollowHandler = (prop) => {
    if (loginInfo.followingList.includes(prop)) {
      return true;
    }
    return false;
  };

  return followerList.map((follower) => (
    <ProfileFollowItem email={follower} isFollow={isFollowHandler(follower)} />
  ));
};

export default ProfileFollowerList;
