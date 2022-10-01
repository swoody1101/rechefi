import { useRef } from "react";
import { useFetchComments } from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useAddComment } from "../../../hooks/comments/useAddComments";
import CommentElement from "./comment_element";
import {
  CommentButton,
  CommentContentInputWrapper,
  CommentCreateAtDiv,
  CommentCreateWrapperDiv,
  CommentElementBox,
  CommentElementInputBox,
  CommentElementNameDiv,
  CommentInput,
  CommentWraper,
  RecommentElementWrapper,
} from "../../styles/comments/comments_styles";
import { useSelector } from "react-redux/es/exports";
import { Box, IconButton, Input, Paper } from "@mui/material";
import LoadingSpinner from "../../../pages/Recipe/List/components/recipe_list_loading_spinner";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import { useState } from "react";
import CommentWriteField from "./comment_write_field";

const Comments = ({ aiButton, postId, uri, queryKey }) => {
  const handle = useParams();
  const { data, isLoading } = useFetchComments({
    queryKey: queryKey,
    articleId: postId !== undefined ? postId : handle.detail,
    uri,
  });

  const [comment, setComment] = useState("");

  const { mutate } = useAddComment(handle.detail, queryKey);
  const auth = useSelector((store) => store.account.auth);
  const reCommentPush = (reComment) => {
    let commentList = data;
    const lastIndex = commentList.filter((e) => {
      return e.group === reComment.group;
    });
    lastIndex.sort(function (a, b) {
      if (a.sequence > b.sequence) {
        return 1;
      } else {
        return -1;
      }
    });
    mutate({
      uri: uri,
      articleId: handle.detail === undefined ? postId : handle.detail,
      sendData: {
        content: reComment.content,
        root: 1,
        group: reComment.group,
        sequence: lastIndex[lastIndex.length - 1].sequence + 1,
      },
    });
    setComment("");
  };
  const commentPush = (e) => {
    e.preventDefault();
    let commentList = data;
    if (commentList.length === 0) {
      const lastIndex = 1;
      const sendData = {
        uri,
        articleId: handle.detail === undefined ? postId : handle.detail,
        sendData: {
          content: comment,
          root: 0,
          group: lastIndex,
          sequence: 1,
        },
      };
      mutate(sendData);
    } else {
      const lastIndex = commentList[commentList.length - 1].group + 1;
      mutate({
        uri,
        articleId: handle.detail === undefined ? postId : handle.detail,
        sendData: {
          content: comment,
          root: 0,
          group: lastIndex,
          sequence: 1,
        },
      });
    }
    setComment("");
  };
  if (isLoading) {
    return <LoadingSpinner isLoading={true} />;
  }

  return (
    <>
      {Object.keys(data).map((e, i) => (
        <Box key={i}>
          {data[e].root === 0 ? (
            <CommentElement comment={data[e]} reCommentPush={reCommentPush} />
          ) : (
            <RecommentElementWrapper>
              <CommentCreateWrapperDiv>
                <CommentElementNameDiv>
                  {data[e].user.nickname}
                </CommentElementNameDiv>
                <CommentCreateAtDiv>{data[e].created_at}</CommentCreateAtDiv>
              </CommentCreateWrapperDiv>
              <div>{data[e].content}</div>
            </RecommentElementWrapper>
          )}
        </Box>
      ))}

      {/* comment write */}
      {auth && (
        <CommentWriteField
          comment={comment}
          setComment={setComment}
          onClick={commentPush}
        />
      )}
    </>
  );
};

export default Comments;
