import { useRef } from "react";
import { useEffect, useState } from "react";
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
} from "../recipe_detail_styles";
import RecipeDetailCommentElement from "./recipe_detail_comment_element";
import { dummyDetailComment } from "./recipe_detail_dummy";

const RecipeDetailComments = () => {
  const [comment, setComment] = useState([]);
  const commentContentRef = useRef(null);

  useEffect(() => {
    dummyDetailComment.sort(function (a, b) {
      if (a.group > b.group) {
        return 1;
      }
      if (a.group === b.group) {
        if (a.sequence > b.sequence) {
          return 1;
        }
        if (a.sequence < b.sequence) {
          return -1;
        }
      }
      if (a.group < b.group) {
        return -1;
      }
      return 0;
    });
    setComment(dummyDetailComment);
  }, []);
  const reCommentPush = (reComment) => {
    let commentList = comment;
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
    setComment((prev) => {
      return [
        ...prev,
        {
          member_id: 1,
          member_nickname: "기타치는이현태",
          content: reComment.content,
          create_at: "2022-09-07",
          root: 1,
          group: reComment.group,
          sequence: lastIndex[lastIndex.length - 1].sequence + 1,
        },
      ].sort(function (a, b) {
        if (a.group > b.group) {
          return 1;
        }
        if (a.group === b.group) {
          if (a.sequence > b.sequence) {
            return 1;
          }
          if (a.sequence < b.sequence) {
            return -1;
          }
        }
        if (a.group < b.group) {
          return -1;
        }
        return 0;
      });
    });
    commentContentRef.current.value = "";
  };
  const commentPush = (e) => {
    e.preventDefault();
    let commentList = comment;
    const lastIndex = commentList[commentList.length - 1].group + 1;
    const content = commentContentRef.current.value;
    setComment((prev) => {
      return [
        ...prev,
        {
          member_id: 1,
          member_nickname: "기타치는이현태",
          content: content,
          create_at: "2022-09-07",
          root: 0,
          group: lastIndex,
          sequence: 1,
        },
      ];
    });
    commentContentRef.current.value = "";
  };
  return (
    <RecipeDetailCommentWraper>
      {Object.keys(comment).map((e, i) => (
        <RecipeDetailCommentElementBox key={i}>
          {comment[e].root === 0 ? (
            <RecipeDetailCommentElement
              comment={comment[e]}
              reCommentPush={reCommentPush}
            />
          ) : (
            <RecipeDetailRecommentElementWrapper>
              <RecipeDetailCommentCreateWrapperDiv>
                <RecipeDetailCommentElementNameDiv>
                  {comment[e].member_nickname}
                </RecipeDetailCommentElementNameDiv>
                <RecipeDetailCommentCreateAtDiv>
                  {comment[e].create_at}
                </RecipeDetailCommentCreateAtDiv>
              </RecipeDetailCommentCreateWrapperDiv>
              <div>{comment[e].content}</div>
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
