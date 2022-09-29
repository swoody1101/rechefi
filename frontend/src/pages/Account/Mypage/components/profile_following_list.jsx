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
    console.log(loginInfo.followingList);
    console.log(temp);
    if (temp) {
      return true;
    }
    return false;
  };

  return followingList.map((following) => (
    <ProfileFollowItem
      key={following}
      email={following}
      isFollow={isFollowHandler(following)}
    />
  ));
};

export default ProfileFollowingList;