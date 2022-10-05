import { useEffect, useState } from "react";
import { Backdrop } from "../../../../../common/styles/sidebar_styles";
import {
  SelectReferenceRecipeDiv,
  WriteAreaWrapper,
} from "../../styles/write/write_page_styles";
import {
  RecipeListSearchResultButton,
  RecipeListSearchWithResultDiv,
  WriteButton,
  WriteWrapper,
} from "../../styles/write/write_styles";
import RecipeModal from "./recipe_modal";
import WriteTextArea from "./write_text";
import { useNavigate } from "react-router-dom";
import useAddMyCook from "../../../../../hooks/my_cook/useAddMyCook";
import { Confirm, Success } from "../../../../../common/components/sweatAlert";
import WriteButtonBar from "./write_buttom_bar";
import ReponsiveContainer from "../../../../../common/components/responsive_container";
import TitleWithDivider from "../../../../../common/components/title_with_divider";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Palette } from "../../../../../common/styles/palette";
import { useInView } from "react-intersection-observer";
import MyCookWriteImageUploader from "./components/my_cook_write_image_uploader";
import PostAddIcon from "@mui/icons-material/PostAdd";
import RecipeSearchDialog from "../../../../../common/components/header/main_header_search";
import RecipeListLoadingSpinner from "../../../../Recipe/List/components/recipe_list_loading_spinner";
import RecipeList from "../../../../Recipe/List/components/recipe_list";
import useFetchList from "../../../../../hooks/useFetch";
import { QueryClient, useQueryClient } from "react-query";

const MyCookWriter = () => {
  // get Recipe from server
  const QUERY_KEY = "SEARHCED_RECIPES";
  const navigate = useNavigate();

  // uplaoded image
  const [image, setImage] = useState("");

  // searched recipe modal
  const [isShowSearchDialog, setIsShowSearchDialog] = useState(false);

  // search recipes
  const [query, setQuery] = useState("");
  const { data, isLoading, fetchNextPage, hasNextPage, refetch } = useFetchList(
    {
      queryKey: QUERY_KEY,
      articleId: 1,
      uri: "/recipe/",
      query: query,
    }
  );

  // search
  const handleSearch = (filter) => {
    setQuery(makeRecipeListQuery(filter));
  };

  useEffect(() => {
    // apply search result
    refetch();
  }, [query, refetch]);

  // for infinity scroll trigger
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  const [referenceRecipe, setReferenceRecipe] = useState({});

  const [content, setContent] = useState("");

  const { mutate } = useAddMyCook("myCookPosts");

  const textHandler = (keyword) => {
    setContent(keyword);
  };

  const onRecipeItemClicked = (id, title) => {
    setReferenceRecipe({ id: id, title });
  };

  const validation = () => {
    if (image.length > 0 && content.length > 0) {
      return false;
    }
    return true;
  };

  const nextPage = () => {
    navigate("/community/my-cook");
  };
  const onConfirm = () => {
    mutate(
      {
        uri: "/community/gallery",
        sendData: { content, image, recipe_id: referenceRecipe.id },
      },
      {
        onSuccess: () => {
          nextPage();
        },
      }
    );
  };

  const onCancel = () => {
    Confirm("작성을 중지합니까?", () => {
      navigate(-1);
    });
  };

  return (
    <ReponsiveContainer
      style={{ display: "flex", flexDirection: "column", px: 3 }}
    >
      {/* for image upload */}
      <MyCookWriteImageUploader imageFile={image} setImageFile={setImage} />
      {/* used recipe area */}
      <TitleWithDivider
        title={"사용된 레시피"}
        textVariant="h6"
        style={{ mt: 2 }}
        icon={
          <PostAddIcon sx={{ color: Palette.black3, fontSize: "1.9rem" }} />
        }
        onClick={() => {
          setIsShowSearchDialog(true);
        }}
      />

      <RecipeSearchDialog
        dialogOpen={isShowSearchDialog}
        setDialogOpen={setIsShowSearchDialog}
        handleSearch={handleSearch}
      >
        <Divider sx={{ my: 3 }} />
        <Box>
          {isLoading ? (
            <RecipeListLoadingSpinner loading={isLoading} />
          ) : (
            data.pages.map((page, index) => (
              <RecipeList
                key={index}
                recipes={page.result.data.post}
                loading={isLoading}
                onRecipeItemClicked={onRecipeItemClicked}
              />
            ))
          )}
        </Box>

        {/* for infinity scroll trigger */}
        <Container ref={ref}></Container>
      </RecipeSearchDialog>

      <WriteAreaWrapper>
        <WriteTextArea textHandler={textHandler} />
      </WriteAreaWrapper>
      <WriteButtonBar
        confirmDisabled={validation()}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </ReponsiveContainer>
  );
};

// make request url query in recipe list
function makeRecipeListQuery(filter) {
  let query = "";
  if (!!!filter) return query;

  // handle title
  if (filter.keyword) query += `title=${filter.keyword}&`;

  // handle tags
  if (filter.tags && filter.tags.length !== 0) {
    query += "tag=";
    filter.tags.forEach((tag, idx) => {
      query += `${tag}${idx !== filter.tags.length - 1 ? "," : "&"}`;
    });
  }

  // handle ingredient
  if (filter.ingreds && filter.ingreds.length !== 0) {
    query += "ingredient=";
    filter.ingreds.forEach((ingred, idx) => {
      query += `${ingred.name}${idx !== filter.ingreds.length - 1 ? "," : ""}`;
    });
  }

  return query;
}

export default MyCookWriter;
