import React from "react";
import FreeBoardListItem from "../item/free_board_list_item";

function FreeBoardListNoticeItems() {
  const data = [
    {
      id: 1,
      title: "핫한 핫소스 실화냐",
      likes: 10,
      date: "2020-10-20",
      member_id: 1,
      member_nickname: "나다",
      comment_count: 3,
    },
    {
      id: 2,
      title: "핫한 핫소스 실화냐",
      likes: 10,
      date: "2020-10-20",
      member_id: 1,
      member_nickname: "나다",
      comment_count: 3,
    },
    {
      id: 3,
      title: "핫한 핫소스 실화냐",
      likes: 10,
      date: "2020-10-20",
      member_id: 1,
      member_nickname: "나다",
      comment_count: 3,
    },
  ];

  return (
    <>
      {data.map((item, index) => (
        <FreeBoardListItem
          key={item.id}
          post={item}
          isNotice={true}
          isLast={data.length - 1 === index}
        />
      ))}
    </>
  );
}

export default FreeBoardListNoticeItems;
