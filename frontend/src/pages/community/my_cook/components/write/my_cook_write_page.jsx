import { useState } from "react";
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
import UploadImageArea from "./UploadImageArea";
import RecipeModal from "./recipe_modal";
import WriteTextArea from "./write_text";
import { useNavigate } from "react-router-dom";
import useAddMyCook from "../../../../../hooks/my_cook/useAddMyCook";
import { Confirm, Success } from "../../../../../common/components/sweatAlert";
import WriteButtonBar from "./write_buttom_bar";
import ReponsiveContainer from "../../../../../common/components/responsive_container";
import TitleWithDivider from "../../../../../common/components/title_with_divider";
import { Box, Button, Paper, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Palette } from "../../../../../common/styles/palette";
import MyCookWriteImageUploader from "./components/my_cook_write_image_uploader";

const MyCookWriter = () => {
  const [searchModal, setSearchModal] = useState(false);

  // uplaoded image
  const [image, setImage] = useState("");

  const [content, setContent] = useState("");
  const [referenceRecipe, setReferenceRecipe] = useState({});

  const navigate = useNavigate();

  const { mutate } = useAddMyCook("myCookPosts");

  const textHandler = (keyword) => {
    setContent(keyword);
  };

  const onRecipeItemClicked = (id, title) => {
    setReferenceRecipe({ id: id, title });
    setSearchModal(false);
  };

  const vali = () => {
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
    <ReponsiveContainer style={{ display: "flex", flexDirection: "column" }}>
      {searchModal && (
        <div>
          <RecipeModal onRecipeItemClicked={onRecipeItemClicked} />
          <Backdrop
            onClick={() => {
              setSearchModal(false);
            }}
          />
        </div>
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="outlined"
          sx={{
            p: 1,
            borderColor: Palette.black2,
            color: Palette.black2,
            "&:focus, &:hover": {
              color: Palette.white2,
              backgroundColor: Palette.gray3,
              borderColor: Palette.gray3,
            },
          }}
        >
          <AddPhotoAlternateIcon />
          <Typography fontWeight={"bold"} sx={{ ml: 1 }}>
            업로드
          </Typography>
        </Button>

        <Button variant="outlined" sx={{ p: 1 }}>
          <ArticleIcon />
          <Typography fontWeight={"bold"} sx={{ ml: 1 }}>
            레시피
          </Typography>
        </Button>
      </Box>

      <MyCookWriteImageUploader imageFile={image} setImageFile={setImage} />

      <RecipeListSearchWithResultDiv>
        <RecipeListSearchResultButton
          onClick={() => {
            setSearchModal((prev) => {
              return !prev;
            });
          }}
        >
          레시피 검색
        </RecipeListSearchResultButton>
        <SelectReferenceRecipeDiv>
          {referenceRecipe.title}
        </SelectReferenceRecipeDiv>
      </RecipeListSearchWithResultDiv>

      <WriteAreaWrapper>
        <WriteTextArea textHandler={textHandler} />
      </WriteAreaWrapper>
      <WriteButtonBar
        confirmDisabled={vali()}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </ReponsiveContainer>
  );
};

export default MyCookWriter;
