import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { loadFollowingListThunk } from "../../../../store/module/accountReducer";
import ProfileFollowItem from "./profile_follow_item";

const ProfileFollowingList = () => {
  const loginInfo = useSelector((store) => store.account);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [followingList, setfollowingList] = useState([]);

  useEffect(() => {
    dispatch(loadFollowingListThunk(state))
      .unwrap()
      .then((res) => {
        setfollowingList([...res.following]);
      });
  }, []);

  const isFollowHandler = (props) => {
    const temp = loginInfo.followingList.map(
      (following) => following === props
    );
    if (temp) {
      return true;
    }
    return false;
  };

  return followingList.map((following) => (
    <ProfileFollowItem
      email={following}
      isFollow={isFollowHandler(following)}
      key={following}
    />
  ));
};

export default ProfileFollowingList;
