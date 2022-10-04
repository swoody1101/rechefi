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
import RecipedetailTitleArea from "./components/recipe_detail_title";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SpatialTrackingIcon from "@mui/icons-material/SpatialTracking";
// import RecipeDeatilAIvoiceControll from "./AIvoice_controll";
import Comments from "../../../common/components/comments/comments";
import { useFetchDetail } from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useLike } from "../../../hooks/useLike";
import { MyCookDetailListLoadingWrapper } from "../../community/my_cook/styles/list/list_style";
import LoadingSpinner from "../List/components/recipe_list_loading_spinner";
import AiArea from "./ai_area";
import { Backdrop } from "../../../common/styles/sidebar_styles";
import { aiReadingFormat } from "../../../store/module/AiReducer";
import { useDispatch } from "react-redux";
import ReponsiveContainer from "../../../common/components/responsive_container";
import FreeBoardDetailPostInfo from "../../community/FreeBoard/Detail/components/free_board_detail_post_info";
import TitleWithDivider from "../../../common/components/title_with_divider";
import { Box } from "@mui/material";

const RecipeDetail = () => {
  const dispatch = useDispatch();

  // handling AI UI
  const [aiButton, setAiButton] = useState(false);
  const toggleAI = () => {
    dispatch(aiReadingFormat());
    setAiButton((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    dispatch(aiReadingFormat());
  }, []);

  // for getting Recipe data
  const { detail } = useParams();

  const { data, isLoading } = useFetchDetail({
    queryKey: "recipeDetail",
    articleId: detail,
    uri: "/recipe/detail/",
  });

  console.log(data);

  const userInfo = useSelector((store) => store.account);

  // for like this recipe
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
        <LoadingSpinner loading={isLoading} />
      </MyCookDetailListLoadingWrapper>
    );
  }
  return (
    <ReponsiveContainer
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* AI dialog component */}
      {aiButton ? (
        <div>
          <AiArea content={data.data.recipe.content} toggleAI={toggleAI} />
          <Backdrop />
        </div>
      ) : null}

      {/* title area */}
      <RecipedetailTitleArea post={data.data} />

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
    </ReponsiveContainer>
  );
};

export default RecipeDetail;
