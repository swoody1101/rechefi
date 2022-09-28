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
import RecipeDetailIngredients from "./ingredients";
import RecipedetailTitleArea from "./title_area";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SpatialTrackingIcon from "@mui/icons-material/SpatialTracking";
import RecipeDeatilAIvoiceControll from "./AIvoice_controll";
import Comments from "../../../common/components/comments/comments";
import { useFetchDetail } from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useLike } from "../../../hooks/useLike";
import { MyCookDetailListLoadingWrapper } from "../../community/my_cook/styles/list/list_style";
import RecipeListLoadingSpinner from "../List/components/recipe_list_loading_spinner";
import AiArea from "./ai_area";
import { Backdrop } from "../../../common/styles/sidebar_styles";

const RecipeDetail = () => {
  const [aiButton, setAiButton] = useState(false);
  const { detail } = useParams();
  const { data, isLoading } = useFetchDetail({
    queryKey: "recipeDetail",
    articleId: detail,
    uri: "/recipe/detail/",
  });
  const userInfo = useSelector((store) => store.account);
  const toggleAI = () => {
    setAiButton((prev) => {
      return !prev;
    });
  };
  const [like, setLike] = useState(false);
  const { mutate } = useLike("recipeDetail");

  const likeHandler = () => {
    if (userInfo.auth) {
      mutate({ articleId: detail, uri: "/recipe/like/" });
    }
  };

  useEffect(() => {
    if (userInfo.auth && data && data.data.like_users.length >= 0) {
      const like_users = data.data.like_users;
      const clickedLike = like_users.filter((e) => {
        return e.nickname === userInfo.nickname;
      });
      if (clickedLike.length === 0) {
        setLike(false);
      } else {
        setLike(true);
      }
    }
  }, [data, userInfo]);

  if (isLoading) {
    return (
      <MyCookDetailListLoadingWrapper>
        <RecipeListLoadingSpinner loading={isLoading} />
      </MyCookDetailListLoadingWrapper>
    );
  }
  return (
    <RecipteDetailWrapperDiv>
      <RecipeDetailAllContentWrapper>
        {aiButton ? (
          <div>
            <AiArea content={data.data.recipe.content} toggleAI={toggleAI} />
            <Backdrop />
          </div>
        ) : null}
        <RecipeDetailTitleWrapperDiv>
          <RecipedetailTitleArea
            post={{
              title: data.data.recipe.title,
              member_nickname: data.data.user.nickname,
              date: data.data.recipe.created_at,
            }}
          />
        </RecipeDetailTitleWrapperDiv>

        <RecipeDetailAIButtonWrapper>
          <RecipeDetailAIButton onClick={toggleAI}>
            레시피 읽어주기<SpatialTrackingIcon></SpatialTrackingIcon>
          </RecipeDetailAIButton>
        </RecipeDetailAIButtonWrapper>

        <RecipeDetailIngredinetsContentDiv>
          <RecipeDetailIngredients ingredients={data.data.ingredients} />
        </RecipeDetailIngredinetsContentDiv>
        <RecipeDetailIngredinetsContentDiv>
          <RecipeDetailContentWrapper>
            <RecipeDetailContent content={data.data.recipe.content} />
          </RecipeDetailContentWrapper>
        </RecipeDetailIngredinetsContentDiv>
        <RecipeDetailLikeWrppaerDiv onClick={likeHandler}>
          <div>추천하기</div>
          <RecipeDetailLikeBorderDiv>
            {like ? (
              <div>
                <ThumbUpIcon />
              </div>
            ) : (
              <div>
                <ThumbUpOffAltIcon />
              </div>
            )}
            <RecipeDetailLikeCount>
              {data.data.like_users.length}
            </RecipeDetailLikeCount>
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
