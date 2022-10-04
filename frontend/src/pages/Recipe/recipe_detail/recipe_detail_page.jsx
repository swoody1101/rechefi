import { useEffect, useState } from "react";
import {
  RecipeDetailAIButton,
  RecipeDetailAIButtonWrapper,
} from "../styles/recipe_detail_styles";
import RecipeDetailContent from "./components/recipe_detail_content";
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
import { Box, IconButton, Typography } from "@mui/material";
import CommentContainer from "../../community/FreeBoard/Detail/components/free_board_detail_comments_container";
import { Palette } from "../../../common/styles/palette";
import RecipeDetailIngredient from "./components/recipe_detail_ingredient";

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

      {/* ingredients area */}
      <RecipeDetailIngredient ingredients={data.data.ingredients} />

      {/* contents */}
      <RecipeDetailContent content={data.data.recipe.content} />

      <IconButton
        onClick={likeHandler}
        sx={{
          mt: 3,
          mb: 1,
          display: "flex",
          alignItems: "center",
          border: 1,
        }}
      >
        {like ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        <Typography fontSize={"1.1rem"} fontWeight={"bold"} sx={{ ml: 1.8 }}>
          {data.data.like_users.length}
        </Typography>
      </IconButton>

      {/* comment area */}
      <CommentContainer>
        <Comments
          uri={"/recipe/comment/"}
          aiButton={aiButton}
          queryKey="recipeComments"
        />
      </CommentContainer>
    </ReponsiveContainer>
  );
};

export default RecipeDetail;
