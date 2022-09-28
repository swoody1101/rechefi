import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import {
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useFetch } from "../../../../hooks/useFetch";
import ErrorMessagePaper from "../../../../common/components/error_message_paper";
import ReadOnlyEditor from "../../../../common/components/read_only_editor";
import TitleWithDivider from "../../../../common/components/title_with_divider";
import LoadingSpinner from "../../../Recipe/List/components/recipe_list_loading_spinner";
import FreeBoardDetailPostInfo from "./components/free_board_detail_post_info";
import FreeBoardDetailBottombar from "./components/free_board_detail_bottombar";
import FreeBoardDetailCommentContainer from "./components/free_board_detail_comments_container";
import Comments from "../../../../common/components/comments/comments";
import http from "../../../../utils/http-commons";

function FreeBoardDetailPage() {
  const { postId } = useParams();

  // check is this notice
  const [searchParam, setSearchParam] = useSearchParams();
  const isNotice = searchParam.get("notice") === "y";

  // handle server data
  const COMMENT_QUERY_KEY = "FREEBOARD_COMMENT";
  const QUERY_KEY = `FREEBOARD_DETAIL`;
  const { isLoading, isError, data, error } = useFetch({
    queryKey: QUERY_KEY,
    param: postId,
    uri: "/community/free-board/detail",
  });

  // const [data, setData] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);
  // const [error, setError] = useState({});

  // useEffect(() => {
  //   http
  //     .get(`/community/free-board/detail/${postId}`)
  //     .then((response) => {
  //       setData(response.data.data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setIsError(true);
  //     });
  // }, []);

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
            title={`${isNotice ? "[공지]" : ""} ${
              data.title
            }`}
            textVariant={"h5"}
          />
          <FreeBoardDetailPostInfo
            // TODO : match with back
            userEmail={""}
            userImage={""}
            userNickname={data.nickname}
            postDate={data.created_at}
            postViews={data.views}
          />
          <ReadOnlyEditor
            HTML={data.content}
            style={{ mt: 2, minHeight: "300px" }}
          />
        </>
      )}

      {/* buttons */}
      <FreeBoardDetailBottombar
        writerId={data ? data.user_id : -1}
      />

      {/* comments */}
      {isError ? (
        "" // if error
      ) : isNotice ? (
        "" // notice dont contain comments
      ) : (
        <FreeBoardDetailCommentContainer>
          <Comments
            aiButton={false}
            postId={postId}
            queryKey={COMMENT_QUERY_KEY}
            uri="/community/free-board/comment/"
          />
        </FreeBoardDetailCommentContainer>
      )}
    </Container>
  );
}

export default FreeBoardDetailPage;
