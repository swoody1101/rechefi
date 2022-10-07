import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadFollowingListThunk,
  loadMyProfileThunk,
} from "../../../../store/module/accountReducer";
import ProfileFollowItem from "./profile_follow_item";

const ProfileFollowingList = (props) => {
  const loginInfo = useSelector((store) => store.account);
  const dispatch = useDispatch();
  const [followingList, setfollowingList] = useState([]);

  useEffect(() => {
    dispatch(loadMyProfileThunk);
    dispatch(loadFollowingListThunk(props.email))
      .unwrap()
      .then((res) => {
        setfollowingList([...res.following]);
      });
  }, []);

  const isFollowHandler = (prop) => {
    const following = loginInfo.followingList.filter(
      (following) => following.nickname === prop.nickname
    );

    if (following.length) {
      return true;
    }
    return false;
  };

  return followingList.map((following) => (
    <ProfileFollowItem
      key={following.email}
      email={following.email}
      nickname={following.nickname}
      imgUrl={following.img_url}
      isFollow={isFollowHandler(following)}
    />
  ));
};

export default ProfileFollowingList;
