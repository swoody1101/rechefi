import { useRef } from "react";
import { useFetchComments } from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useAddComment } from "../../../hooks/useAddComments";
import CommentElement from "./comment_element";
import {
  CommentButton,
  CommentContentInputWrapper,
  CommentCreateAtDiv,
  CommentCreateWrapperDiv,
  CommentElementBox,
  CommentElementNameDiv,
  CommentInput,
  CommentWraper,
  RecommentElementWrapper,
} from "../../styles/comments/comments_styles";

const Comments = ({ aiButton, postId, uri }) => {
  const handle = useParams();
  const commentContentRef = useRef(null);

  const { data, isLoading } = useFetchComments({
    queryKey: "recipeComments",
    articleId: postId !== undefined ? postId : handle.detail,
    uri,
  });
  const { mutate } = useAddComment(handle.detail);
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
      articleId: handle.detail,
      sendData: {
        content: reComment.content,
        root: 1,
        group: reComment.group,
        sequence: lastIndex[lastIndex.length - 1].sequence + 1,
      },
    });
    commentContentRef.current.value = "";
  };
  const commentPush = (e) => {
    e.preventDefault();
    let commentList = data;
    const lastIndex = commentList[commentList.length - 1].group + 1;
    const content = commentContentRef.current.value;
    mutate({
      uri,
      articleId: handle.detail,
      sendData: {
        content,
        root: 0,
        group: lastIndex,
        sequence: 1,
      },
    });
    commentContentRef.current.value = "";
  };
  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <CommentWraper aiButton={aiButton}>
      {Object.keys(data).map((e, i) => (
        <CommentElementBox key={i}>
          {data[e].root === 0 ? (
            <CommentElement comment={data[e]} reCommentPush={reCommentPush} />
          ) : (
            <RecommentElementWrapper>
              <CommentCreateWrapperDiv>
                <CommentElementNameDiv>
                  {data[e].nickname}
                </CommentElementNameDiv>
                <CommentCreateAtDiv>{data[e].create_at}</CommentCreateAtDiv>
              </CommentCreateWrapperDiv>
              <div>{data[e].content}</div>
            </RecommentElementWrapper>
          )}
        </CommentElementBox>
      ))}
      <CommentElementBox>
        <CommentContentInputWrapper>
          <CommentInput ref={commentContentRef} />
          <CommentButton onClick={commentPush}>댓글 달기</CommentButton>
        </CommentContentInputWrapper>
      </CommentElementBox>
    </CommentWraper>
  );
};

export default Comments;
