import { useFetchComments } from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useAddComment } from "../../../hooks/comments/useAddComments";
import CommentElement from "./comment_element";
import { useSelector } from "react-redux/es/exports";
import { Box, Divider, Typography } from "@mui/material";
import LoadingSpinner from "../../../pages/Recipe/List/components/recipe_list_loading_spinner";
import { useState } from "react";
import CommentWriteField from "./comment_write_field";

const Comments = ({ postId, uri, queryKey }) => {
  const handle = useParams();
  const post_id = postId || handle.detail;

  // check logined
  const auth = useSelector((store) => store.account.auth);

  const [comment, setComment] = useState("");
  const { data, isLoading } = useFetchComments({
    queryKey: queryKey,
    articleId: post_id,
    uri,
  });

  const { mutate } = useAddComment(handle.detail, queryKey);

  const reCommentPush = (reComment) => {
    if (reComment.content === "") return;

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
      articleId: post_id,
      sendData: {
        content: reComment.content,
        root: 1,
        group: reComment.group,
        sequence: lastIndex[lastIndex.length - 1].sequence + 1,
      },
    });
    setComment("");
  };

  const commentPush = () => {
    if (comment === "") return;

    let commentList = data;
    if (commentList.length === 0) {
      const lastIndex = 1;
      const sendData = {
        uri,
        articleId: post_id,
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
        articleId: post_id,
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
      <Typography fontWeight={"bold"} sx={{ my: 1 }}>
        댓글 목록
      </Typography>
      <Divider sx={{ mb: 1 }} />
      {data.length === 0 ? (
        <Typography sx={{ my: 2 }}>작성된 댓글이 없습니다</Typography>
      ) : (
        Object.keys(data).map((e, i) => (
          <Box
            key={i}
            sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}
          >
            {data[e].root === 0 ? (
              // root element
              <CommentElement
                comment={data[e]}
                reCommentPush={reCommentPush}
                uri={uri}
                queryKey={queryKey}
              />
            ) : (
              // recommented element
              <Box sx={{ width: "85%", ml: "auto" }}>
                <CommentElement
                  comment={data[e]}
                  reCommentPush={reCommentPush}
                  isRoot={false}
                  uri={uri}
                  queryKey={queryKey}
                />
              </Box>
            )}
          </Box>
        ))
      )}

      {/* comment write */}
      {auth && (
        <Box sx={{ mt: 2 }}>
          <Divider />
          <CommentWriteField
            comment={comment}
            setComment={setComment}
            onClick={commentPush}
          />
        </Box>
      )}
    </>
  );
};

export default Comments;
