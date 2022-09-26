import { useRef } from "react";
import { useState } from "react";
import { CommentButton, CommentContentInputWrapper, CommentCreateAtDiv, CommentCreateWrapperDiv, CommentElementBox, CommentElementNameDiv, CommentElementWraper, CommentInput } from "../../styles/comments/comments_styles";

const CommentElement = ({ comment, reCommentPush }) => {
  const [reCommentOpen, setReCommentOpen] = useState(false);
  const [reCommentContent, setReCommentContent] = useState("");
  const onClick = () => {
    const inputValue = reCommentContent;
    const reComment = {
      content: inputValue,
      group: comment.group,
    };
    reCommentPush(reComment);
    setReCommentContent("");
    setReCommentOpen(false);
  };
  const onChange = (e) => {
    setReCommentContent(e.target.value);
  };
  return (
    <CommentElementWraper>
      <CommentCreateWrapperDiv>
        <CommentElementNameDiv>
          {comment.nickname}
        </CommentElementNameDiv>
        <CommentCreateAtDiv>
          {comment.create_at}
        </CommentCreateAtDiv>
      </CommentCreateWrapperDiv>
      <div>{comment.content}</div>
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
      {reCommentOpen && (
        <CommentElementBox>
          <CommentContentInputWrapper>
            <CommentInput onChange={onChange} />
            <CommentButton onClick={onClick}>
              답글 작성
            </CommentButton>
          </CommentContentInputWrapper>
        </CommentElementBox>
      )}
    </CommentElementWraper>
  );
};

export default CommentElement;
