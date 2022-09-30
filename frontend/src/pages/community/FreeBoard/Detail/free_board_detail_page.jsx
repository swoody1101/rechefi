import React, { useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
import { useDelete } from "../../../../hooks/useMutations";
import {
  Confirm,
  Success,
  Warn,
} from "../../../../common/components/sweatAlert";
import { useSelector } from "react-redux";

function FreeBoardDetailPage() {
  const navigate = useNavigate();

  // check is this notice
  const [searchParam, setSearchParam] = useSearchParams();
  const isNotice = searchParam.get("notice") === "y";
  const { postId } = useParams();

  // handle server data
  const COMMENT_QUERY_KEY = "FREEBOARD_COMMENT";
  const DETAIL_QUERY_KEY = "FREEBOARD_DETAIL";
  const { isLoading, isError, data, error } = useFetch({
    queryKey: DETAIL_QUERY_KEY,
    param: postId,
    uri: `/community/${isNotice ? "notice-board" : "free-board"}/detail`,
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

  // get user info from store
  const login_info = useSelector((store) => store.account);
  const isAdmin = login_info.admin || false;
  const userId = login_info.user_id || -2;
  const writerId = data ? data.user_id : -1;

  // for delete and modify authority
  const hasAuth = () => {
    if (isAdmin) return false;
    if (userId !== writerId) return true;
    else return false;
  };

  // delete request to server
  const QUERY_KEY = isNotice ? "FREEBOARD" : "NOTICE";
  const { mutate } = useDelete(QUERY_KEY);
  const deletePost = () => {
    Confirm("정말로 글을 삭제하시겠습니까?", () => {
      mutate(
        {
          uri: `/community/${
            isNotice ? "notice-board" : "free-board"
          }/${postId}`,
        },
        {
          onSuccess: (response) => {
            if (response.message === "success") {
              Success("글 삭제가 완료되었습니다");
              navigate("/community/free-board", {
                replace: true,
              });
            } else {
              Warn("글 삭제 중 문제가 발생하였습니다");
            }
          },
        }
      );
    });
  };

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
            title={`${isNotice ? "[공지]" : ""} ${data.title}`}
            textVariant={"h5"}
          />
          <FreeBoardDetailPostInfo
            // TODO : match with back
            userEmail={data.user.email}
            userImage={data.user.img_url}
            userNickname={data.user.nickname}
            postDate={data.created_at}
            postViews={data.views}
          />
          <ReadOnlyEditor
            HTML={data.content}
            style={{ mt: 2, minHeight: "300px" }}
          />
        </>
      )}

      {/* bottom buttons */}
      <FreeBoardDetailBottombar
        onListClick={() => {
          navigate("/community/free-board");
        }}
        onModifyClick={() => {
          // add if notice
          navigate(
            `/community/free-board/write?${
              isNotice ? "notice=y&" : ""
            }modify=${postId}`
          );
        }}
        onDeleteClick={deletePost}
        disabledCondition={hasAuth}
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
