import { useRef } from "react";
import { useState } from "react";
import {
  CommentButton,
  CommentContentInputWrapper,
  CommentCreateAtDiv,
  CommentCreateWrapperDiv,
  CommentElementBox,
  CommentElementNameDiv,
  CommentElementWraper,
  CommentInput,
} from "../../styles/comments/comments_styles";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Box } from "@mui/material";
import CommentWriteField from "./comment_write_field";

const CommentElement = ({ comment, reCommentPush }) => {
  const [reCommentOpen, setReCommentOpen] = useState(false);
  const [reCommentContent, setReCommentContent] = useState("");
  const auth = useSelector((store) => store.account.auth);

  // write recomment
  const writeRecomment = () => {
    const inputValue = reCommentContent;
    const reComment = {
      content: inputValue,
      group: comment.group,
    };
    reCommentPush(reComment);
    setReCommentContent("");
    setReCommentOpen(false);
  };

  return (
    <>
      <Box>
        <CommentElementNameDiv>{comment.user.nickname}</CommentElementNameDiv>
        <CommentCreateAtDiv>{comment.created_at}</CommentCreateAtDiv>
      </Box>
      <div>{comment.content}</div>
      {auth && (
        <div>
          <CommentButton
            onClick={() => {
              setReCommentOpen((prev) => {
                return !prev;
              });
            }}
          >
            답글 달기
          </CommentButton>
        </div>
      )}

      {reCommentOpen && (
        <Box sx={{ ml: 2 }}>
          <CommentWriteField
            comment={reCommentContent}
            setComment={setReCommentContent}
            onClick={writeRecomment}
          />
        </Box>
      )}
    </>
  );
};

export default CommentElement;
