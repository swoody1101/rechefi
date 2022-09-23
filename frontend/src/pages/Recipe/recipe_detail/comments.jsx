import { useRef } from "react";
import { useState } from "react";
import { useFetchComments } from "../../../hooks/useFetch";
import {
  RecipeDetailCommentButton,
  RecipeDetailCommentContentInputWrapper,
  RecipeDetailCommentCreateAtDiv,
  RecipeDetailCommentCreateWrapperDiv,
  RecipeDetailCommentElementBox,
  RecipeDetailCommentElementNameDiv,
  RecipeDetailCommentInput,
  RecipeDetailCommentWraper,
  RecipeDetailRecommentElementWrapper,
} from "../recipe_detail_styles/styles";
import RecipeDetailCommentElement from "./comment_element";
import { useParams } from "react-router-dom";
import { useAddComment } from "../../../hooks/useAddComments";

const RecipeDetailComments = ({ aiButton }) => {
  const handle = useParams();
  const commentContentRef = useRef(null);

  const { data, isLoading } = useFetchComments({
    queryKey: "recipeComments",
    articleId: handle.detail,
    uri: "/recipe/comment/",
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
      uri: "/recipe/comment/",
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
      uri: "/recipe/comment/",
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
    <RecipeDetailCommentWraper aiButton={aiButton}>
      {Object.keys(data).map((e, i) => (
        <RecipeDetailCommentElementBox key={i}>
          {data[e].root === 0 ? (
            <RecipeDetailCommentElement
              comment={data[e]}
              reCommentPush={reCommentPush}
            />
          ) : (
            <RecipeDetailRecommentElementWrapper>
              <RecipeDetailCommentCreateWrapperDiv>
                <RecipeDetailCommentElementNameDiv>
                  {data[e].nickname}
                </RecipeDetailCommentElementNameDiv>
                <RecipeDetailCommentCreateAtDiv>
                  {data[e].create_at}
                </RecipeDetailCommentCreateAtDiv>
              </RecipeDetailCommentCreateWrapperDiv>
              <div>{data[e].content}</div>
            </RecipeDetailRecommentElementWrapper>
          )}
        </RecipeDetailCommentElementBox>
      ))}
      <RecipeDetailCommentElementBox>
        <RecipeDetailCommentContentInputWrapper>
          <RecipeDetailCommentInput ref={commentContentRef} />
          <RecipeDetailCommentButton onClick={commentPush}>
            댓글 달기
          </RecipeDetailCommentButton>
        </RecipeDetailCommentContentInputWrapper>
      </RecipeDetailCommentElementBox>
    </RecipeDetailCommentWraper>
  );
};

export default RecipeDetailComments;
