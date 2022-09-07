import { useEffect, useState } from "react";
import { RecipeDetailTitleWrapperDiv } from "../recipe_detail_styles";
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
      <div>
        <RecipeDetailIngredients ingredients={ingredients} />
      </div>
      <div></div>
    </div>
  );
};

export default RecipeDetail;
