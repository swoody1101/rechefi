import { useEffect, useState } from "react";
import {
  RecipeDetailAIButton,
  RecipeDetailAIButtonWrapper,
} from "../styles/recipe_detail_styles";
import RecipeDetailContent from "./components/recipe_detail_content";
import RecipedetailTitleArea from "./components/recipe_detail_title";

import SpatialTrackingIcon from "@mui/icons-material/SpatialTracking";
// import RecipeDeatilAIvoiceControll from "./AIvoice_controll";
import Comments from "../../../common/components/comments/comments";
import { useFetchDetail } from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useLike } from "../../../hooks/useLike";
import { MyCookDetailListLoadingWrapper } from "../../community/my_cook/styles/list/list_style";
import LoadingSpinner from "../List/components/recipe_list_loading_spinner";
import AiArea from "./ai_area";
import { Backdrop } from "../../../common/styles/sidebar_styles";
import { aiReadingFormat } from "../../../store/module/AiReducer";
import { useDispatch } from "react-redux";
import ReponsiveContainer from "../../../common/components/responsive_container";
import CommentContainer from "../../community/FreeBoard/Detail/components/free_board_detail_comments_container";
import RecipeDetailIngredient from "./components/recipe_detail_ingredient";
import RecipeDetailLikeBtn from "./components/recipe_detail_like_btn";
import AlertSnackbar from "../../../common/components/alert_snackbar";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Palette } from "../../../common/styles/palette";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RecipeDetailPopover from "./components/recipe_detail_popover";

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
  const [alertOpen, setAlertOpen] = useState(false);
  const [like, setLike] = useState(false);

  const { mutate } = useLike("recipeDetail");
  const likeHandler = () => {
    if (userInfo.auth) {
      mutate({ articleId: detail, uri: "/recipe/like/" });
    } else {
      setAlertOpen(true);
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

  // getting control popover
  const [anchorEl, setAnchorEl] = useState(null);
  const popoverOpen = Boolean(anchorEl);

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

      <Box
        sx={{
          display: "flex",
          my: 2,
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        {/* for showing AI dialog  */}
        <IconButton
          onClick={toggleAI}
          sx={{
            background: Palette.mainColor2,
            p: 1.3,
          }}
        >
          <SpatialTrackingIcon />
        </IconButton>
        {/* show helper  */}
        <IconButton
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
          }}
        >
          <HelpOutlineIcon />
        </IconButton>

        {/* help for using mic */}
        <RecipeDetailPopover
          open={popoverOpen}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
        />
      </Box>

      {/* ingredients area */}
      <RecipeDetailIngredient ingredients={data.data.ingredients} />

      {/* contents */}
      <RecipeDetailContent content={data.data.recipe.content} />

      {/* like button */}
      <RecipeDetailLikeBtn
        onClick={likeHandler}
        isLike={like}
        likes={data.data.like_users.length}
      />

      {/* comment area */}
      <CommentContainer>
        <Comments
          uri={"/recipe/comment/"}
          aiButton={aiButton}
          queryKey="recipeComments"
        />
      </CommentContainer>

      {/* for snackbar alert */}
      <AlertSnackbar
        open={alertOpen}
        handleClose={() => {
          setAlertOpen(false);
        }}
        message={"로그인이 필요합니다"}
      />
    </ReponsiveContainer>
  );
};

export default RecipeDetail;
