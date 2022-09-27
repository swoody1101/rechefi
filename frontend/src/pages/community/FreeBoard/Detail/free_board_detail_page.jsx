import React from "react";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../../hooks/useFetch";
import ErrorMessagePaper from "../../../../common/components/error_message_paper";
import ReadOnlyEditor from "../../../../common/components/read_only_editor";
import TitleWithDivider from "../../../../common/components/title_with_divider";
import LoadingSpinner from "../../../Recipe/List/components/recipe_list_loading_spinner";
import FreeBoardDetailPostInfo from "./components/free_board_detail_post_info";

function FreeBoardDetailPage() {
  const { postId } = useParams();

  // handle server data
  const QUERY_KEY = "FREEBOARD_DETAIL";
  const { isLoading, isError, data, error } = useFetch({
    queryKey: QUERY_KEY,
    param: postId,
    uri: "/community/free-board/detail",
  });

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        pt: 3,
        px: 3,
        pb: 1,
      }}
    >
      {/* handling events */}
      {isLoading ? (
        <LoadingSpinner loading={true} />
      ) : isError ? (
        <ErrorMessagePaper
          message={
            error.response.status === 404
              ? "존재하지 않는 글 입니다"
              : "서버와 통신 중 문제가 발생하였습니다"
          }
        />
      ) : (
        // shown contents
        <>
          <TitleWithDivider
            title={data.title}
            textVariant={"h5"}
          />
          <FreeBoardDetailPostInfo
            userEmail={""}
            userImage={""}
            userNickname={data.nickname}
            postDate={data.created_at}
            postViews={data.views}
          />
          <ReadOnlyEditor
            HTML={data.content}
            style={{ mt: 2, minHeight: "360px" }}
          />
        </>
      )}
    </Container>
  );
}

export default FreeBoardDetailPage;
