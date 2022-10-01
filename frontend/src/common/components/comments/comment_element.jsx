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
import { Box, Button, Paper, Typography } from "@mui/material";
import CommentWriteField from "./comment_write_field";
import { Palette } from "../../styles/palette";
import CommentElementBtn from "./comment_element_btn";
import { useDelete } from "../../../hooks/useMutations";

const CommentElement = ({ comment, reCommentPush, isRoot, queryKey }) => {
  const [reCommentOpen, setReCommentOpen] = useState(false);
  const [reCommentContent, setReCommentContent] = useState("");
  const loginInfo = useSelector((store) => store.account);

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

  // use Delete comment
  const { mutate } = useDelete();

  return (
    <>
      <Paper sx={{ px: 2, py: 1, mt: 1 }}>
        {/* comment Info */}
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <Typography fontWeight={"bold"} sx={{ mr: 1 }}>
            {comment.user.nickname}
          </Typography>
          <Typography fontSize={"0.7rem"} sx={{ color: Palette.black1 }}>
            {new Date(comment.created_at).toLocaleString()}
          </Typography>
        </Box>

        {/* comment content */}
        <Typography sx={{ m: 1 }}>{comment.content}</Typography>

        <Box sx={{ display: "flex", columnGap: 1 }}>
          {/* recomment button */}
          {loginInfo.auth && isRoot && (
            <CommentElementBtn
              onClick={() => {
                setReCommentOpen((prev) => {
                  return !prev;
                });
              }}
            >
              답글
            </CommentElementBtn>
          )}
          {comment.user.nickname === loginInfo.nickname && (
            <CommentElementBtn
              onClick={() => {
                setReCommentOpen((prev) => {
                  return !prev;
                });
              }}
            >
              삭제
            </CommentElementBtn>
          )}
        </Box>
      </Paper>

      {/* recomment input area */}
      {reCommentOpen && (
        <Box sx={{ width: "85%", ml: "auto" }}>
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

CommentElement.defaultProps = {
  isRoot: true,
};

export default CommentElement;
