import { Container } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TitleWithDivider from "../../../../common/components/title_with_divider";
import FreeBoardListItem from "./components/item/free_board_list_item";
import FreeBoardListItemContainer from "./components/free_board_list_items_container";
import FreeBoardListItemNotices from "./components/notice/free_board_list_notices_items";
import FreeBoardPagination from "./components/free_board_list_pagination";
import RecipeListFab from "../../../Recipe/List/components/recipe_list_fab";
import { useFetch } from "../../../../hooks/useFetch";
import LoadingSpinner from "../../../Recipe/List/components/recipe_list_loading_spinner";
import ErrorMessagePaper from "../../../../common/components/error_message_paper";
import { getToken } from "../../../../utils/JWT-token";

function FreeBoardPage() {
  const navigate = useNavigate();

  // get page number from URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page_num = parseInt(query.get("page") || "1", 30);

  // handle server data
  const QUERY_KEY = "FREEBOARD";
  const { isLoading, isError, data } = useFetch({
    queryKey: QUERY_KEY,
    param: page_num,
    uri: "/community/free-board",
  });

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TitleWithDivider
        textVariant={"h5"}
        title="자유 게시판"
        style={{ px: 1, pt: 3 }}
      ></TitleWithDivider>
      {/* notice Items */}
      <FreeBoardListItemContainer isNotice={true}>
        <FreeBoardListItemNotices />
      </FreeBoardListItemContainer>

      {/* freeboard Items */}
      <FreeBoardListItemContainer style={{ mt: 1 }}>
        {isLoading ? (
          <LoadingSpinner loading={true} />
        ) : isError ? (
          <ErrorMessagePaper
            message={"글을 불러오는 중 문제가 발생하였습니다"}
          />
        ) : data.posts.length === 0 ? (
          <ErrorMessagePaper message={"작성된 글이 없습니다"} />
        ) : (
          data.posts.map((item, index) => (
            <FreeBoardListItem
              key={item.id}
              post={item}
              isLast={data.length - 1 === index}
              onClick={() =>
                navigate(`/community/free-board/detail/${item.id}`)
              }
            />
          ))
        )}
      </FreeBoardListItemContainer>
      <FreeBoardPagination
        totalPages={data ? data.totalPages : 1}
        urlLink="/community/free-board"
      />

      {/* show write btn when login */}
      {getToken() ? (
        <RecipeListFab
          onClick={() => {
            navigate("/community/free-board/write");
          }}
        />
      ) : (
        ""
      )}
    </Container>
  );
}

export default FreeBoardPage;
