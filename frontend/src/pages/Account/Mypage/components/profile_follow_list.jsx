import React from "react";

import ProfileFollowItem from "./profile_follow_item";

const ProfileFollowList = () => {
  const followList = [
    { id: 1, nickname: "유저1", isFollow: true },
    { id: 2, nickname: "유저2", isFollow: true },
    { id: 3, nickname: "유저3", isFollow: false },
    { id: 4, nickname: "유저4", isFollow: true },
    { id: 5, nickname: "유저5", isFollow: false },
    { id: 6, nickname: "유저6", isFollow: false },
  ];

  return followList.map((follow) => (
    <ProfileFollowItem
      id={follow.id}
      nickname={follow.nickname}
      isFollow={follow.isFollow}
    />
  ));
};

export default ProfileFollowList;
