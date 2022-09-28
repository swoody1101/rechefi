import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessagePaper from "../../../../../../common/components/error_message_paper";
import { useFetch } from "../../../../../../hooks/useFetch";
import LoadingSpinner from "../../../../../Recipe/List/components/recipe_list_loading_spinner";
import FreeBoardListItem from "../item/free_board_list_item";

function FreeBoardListNoticeItems() {
  const navigate = useNavigate();

  // handle server data
  const QUERY_KEY = "NOTICE";
  const { isLoading, isError, data } = useFetch({
    queryKey: QUERY_KEY,
    param: 1,
    uri: "/community/notice-board",
  });

  return (
    <>
      {isLoading ? (
        <LoadingSpinner loading={true} />
      ) : isError ? (
        <ErrorMessagePaper
          message={
            "공지을 불러오는 중 문제가 발생하였습니다"
          }
        />
      ) : data.posts.length === 0 ? (
        <ErrorMessagePaper
          message={"작성된 공지가 없습니다"}
        />
      ) : (
        data.posts.map((item, index) => (
          <FreeBoardListItem
            key={item.id}
            post={item}
            isNotice={true}
            isLast={data.length - 1 === index}
            onClick={() =>
              navigate(
                `/community/free-board/detail/${item.id}?notice=y`
              )
            }
          />
        ))
      )}
    </>
  );
}

export default FreeBoardListNoticeItems;
