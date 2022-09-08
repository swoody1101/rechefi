import { useEffect, useState } from "react";
import {
  RecipeDetailContentWrapper,
  RecipeDetailIngredinetsContentDiv,
  RecipeDetailIngredinetsDiv,
  RecipeDetailTitleWrapperDiv,
} from "../recipe_detail_styles";
import RecipeDetailContent from "./recipe_detail_content";
import { dummyDetail } from "./recipe_detail_dummy";
import RecipeDetailIngredients from "./recipe_detail_ingredients";
import RecipedetailTitleArea from "./recipe_detail_title_area";
const RecipeDetail = () => {
  const [post, setPost] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const {
      title,
      content,
      ingredients,
      member_id,
      member_nickname,
      tags,
      likes,
      date,
      comment_count,
      like_member_id,
      comments,
    } = dummyDetail;
    setPost({
      title,
      member_id,
      member_nickname,
      date,
      likes,
      comment_count,
      like_member_id,
    });
    setIngredients(ingredients);
    setTags(tags);
    setComments(comments);
    setContent(content);
  }, []);
  return (
    <div>
      <RecipeDetailTitleWrapperDiv>
        <RecipedetailTitleArea post={post} />
      </RecipeDetailTitleWrapperDiv>
      <RecipeDetailIngredinetsContentDiv>
        <RecipeDetailIngredients ingredients={ingredients} />
      </RecipeDetailIngredinetsContentDiv>
      <RecipeDetailIngredinetsContentDiv>
        <RecipeDetailContentWrapper>
          <RecipeDetailContent content={content} />
        </RecipeDetailContentWrapper>
      </RecipeDetailIngredinetsContentDiv>
    </div>
  );
};

export default RecipeDetail;
