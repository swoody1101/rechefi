import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadFollowerListThunk,
  loadMyProfileThunk,
} from "../../../../store/module/accountReducer";
import ProfileFollowItem from "./profile_follow_item";

const ProfileFollowerList = (props) => {
  const loginInfo = useSelector((store) => store.account);
  const dispatch = useDispatch();
  const [followerList, setfollowerList] = useState([]);

  useEffect(() => {
    dispatch(loadMyProfileThunk);
    dispatch(loadFollowerListThunk(props.email))
      .unwrap()
      .then((res) => {
        setfollowerList([...res.follower]);
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

  return followerList.map((follower) => (
    <ProfileFollowItem
      key={follower.email}
      email={follower.email}
      nickname={follower.nickname}
      imgUrl={follower.img_url}
      isFollow={isFollowHandler(follower)}
    />
  ));
};

export default ProfileFollowerList;
