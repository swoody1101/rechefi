import { useRef } from "react";
import { useState } from "react";
import {
  RecipeDetailCommentButton,
  RecipeDetailCommentContentInputWrapper,
  RecipeDetailCommentCreateAtDiv,
  RecipeDetailCommentCreateWrapperDiv,
  RecipeDetailCommentElementBox,
  RecipeDetailCommentElementNameDiv,
  RecipeDetailCommentElementWraper,
  RecipeDetailCommentInput,
} from "../recipe_detail_styles/styles";

const RecipeDetailCommentElement = ({ comment, reCommentPush }) => {
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
    <RecipeDetailCommentElementWraper>
      <RecipeDetailCommentCreateWrapperDiv>
        <RecipeDetailCommentElementNameDiv>
          {comment.nickname}
        </RecipeDetailCommentElementNameDiv>
        <RecipeDetailCommentCreateAtDiv>
          {comment.create_at}
        </RecipeDetailCommentCreateAtDiv>
      </RecipeDetailCommentCreateWrapperDiv>
      <div>{comment.content}</div>
      <div>
        <RecipeDetailCommentButton
          onClick={() => {
            setReCommentOpen((prev) => {
              return !prev;
            });
          }}
        >
          답글 달기
        </RecipeDetailCommentButton>
      </div>
      {reCommentOpen && (
        <RecipeDetailCommentElementBox>
          <RecipeDetailCommentContentInputWrapper>
            <RecipeDetailCommentInput onChange={onChange} />
            <RecipeDetailCommentButton onClick={onClick}>
              답글 작성
            </RecipeDetailCommentButton>
          </RecipeDetailCommentContentInputWrapper>
        </RecipeDetailCommentElementBox>
      )}
    </RecipeDetailCommentElementWraper>
  );
};

export default RecipeDetailCommentElement;
