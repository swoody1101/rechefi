import { useEffect, useState } from "react";
import {
  RecipeDetailAIButton,
  RecipeDetailAIButtonWrapper,
  RecipeDetailAllContentWrapper,
  RecipeDetailContentWrapper,
  RecipeDetailIngredinetsContentDiv,
  RecipeDetailLikeBorderDiv,
  RecipeDetailLikeCount,
  RecipeDetailLikeWrppaerDiv,
  RecipeDetailTitleWrapperDiv,
  RecipteDetailWrapperDiv,
} from "../styles/recipe_detail_styles";
import RecipeDetailContent from "./content";
import { dummyDetail } from "./dummy";
import RecipeDetailIngredients from "./ingredients";
import RecipedetailTitleArea from "./title_area";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SpatialTrackingIcon from "@mui/icons-material/SpatialTracking";
import RecipeDeatilAIvoiceControll from "./AIvoice_controll";
import Comments from "../../../common/components/comments/comments";

const RecipeDetail = () => {
  const [post, setPost] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [aiButton, setAiButton] = useState(false);
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
    setContent(content);
  }, []);
  const toggleAI = () => {
    setAiButton((prev) => {
      return !prev;
    });
  };
  return (
    <RecipteDetailWrapperDiv>
      <RecipeDetailAllContentWrapper>
        {aiButton ? <RecipeDeatilAIvoiceControll /> : null}
        <RecipeDetailTitleWrapperDiv>
          <RecipedetailTitleArea post={post} />
        </RecipeDetailTitleWrapperDiv>

        <RecipeDetailAIButtonWrapper>
          <RecipeDetailAIButton onClick={toggleAI}>
            레시피 읽어주기<SpatialTrackingIcon></SpatialTrackingIcon>
          </RecipeDetailAIButton>
        </RecipeDetailAIButtonWrapper>

        <RecipeDetailIngredinetsContentDiv>
          <RecipeDetailIngredients ingredients={ingredients} />
        </RecipeDetailIngredinetsContentDiv>
        <RecipeDetailIngredinetsContentDiv>
          <RecipeDetailContentWrapper>
            <RecipeDetailContent content={content} />
          </RecipeDetailContentWrapper>
        </RecipeDetailIngredinetsContentDiv>
        <RecipeDetailLikeWrppaerDiv>
          <div>추천하기</div>
          <RecipeDetailLikeBorderDiv>
            <div>
              <ThumbUpIcon />
            </div>
            <RecipeDetailLikeCount>{post.likes}</RecipeDetailLikeCount>
          </RecipeDetailLikeBorderDiv>
        </RecipeDetailLikeWrppaerDiv>
        <RecipeDetailIngredinetsContentDiv>
          <Comments
            uri={"/recipe/comment/"}
            aiButton={aiButton}
            queryKey="recipeComments"
          />
        </RecipeDetailIngredinetsContentDiv>
      </RecipeDetailAllContentWrapper>
    </RecipteDetailWrapperDiv>
  );
};

export default RecipeDetail;
