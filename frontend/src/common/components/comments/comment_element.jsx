import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Box, Paper, Typography } from "@mui/material";
import CommentWriteField from "./comment_write_field";
import { Palette } from "../../styles/palette";
import CommentElementBtn from "./comment_element_btn";
import { useDelete } from "../../../hooks/useMutations";
import { Confirm, Success, Warn } from "../sweatAlert";

const CommentElement = ({ comment, reCommentPush, isRoot, uri, queryKey }) => {
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
  const { mutate } = useDelete(queryKey);
  const deleteComment = () => {
    Confirm("정말로 댓글을 삭제하시겠습니까?", () => {
      mutate(
        {
          uri: `${uri}${comment.id}`,
        },
        {
          onSuccess: (response) => {
            if (response.message === "success") {
              Success("글 삭제가 완료되었습니다");
            } else {
              Warn("댓글 삭제 중 문제가 발생하였습니다");
            }
          },
        }
      );
    });
  };

  return (
    <>
      <Paper sx={{ px: 2, py: 1, mt: 1 }}>
        {comment.deleted ? (
          <Typography sx={{ color: Palette.gray3 }}>
            삭제된 댓글입니다.
          </Typography>
        ) : (
          <>
            {/* comment Info */}
            <Box
              sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
            >
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
                <CommentElementBtn onClick={deleteComment}>
                  삭제
                </CommentElementBtn>
              )}
            </Box>
          </>
        )}
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
