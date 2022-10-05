import { useState } from "react";
import { convertToHTML } from "draft-convert";
import { useNavigate } from "react-router-dom";
import useAddMyCook from "../../../../../hooks/my_cook/useAddMyCook";
import { Confirm } from "../../../../../common/components/sweatAlert";
import WriteButtonBar from "./components/my_cook_write_bottom_bar";
import ReponsiveContainer from "../../../../../common/components/responsive_container";
import MyCookWriteImageUploader from "./components/my_cook_write_image_uploader";
import MyCookWriteReferenceRecipe from "./components/my_cook_write_reference_recipe";
import MyCookWriteSearchDialog from "./components/my_cook_write_search_dialog";
import FreeBoardWriteEditorContainer from "../../../FreeBoard/Write/components/editor/free_board_write_editor_container";
import EditorWithImage from "../../../FreeBoard/Write/components/editor/free_board_write_editor_with_image";
import { EditorState } from "draft-js";

const MyCookWriter = () => {
  const navigate = useNavigate();

  // uplaoded image
  const [image, setImage] = useState("");

  // searched recipe modal
  const [isShowSearchDialog, setIsShowSearchDialog] = useState(false);

  // handlie reference Recipe
  const [referenceRecipe, setReferenceRecipe] = useState(null);
  const onRecipeItemClicked = (recipe) => {
    setReferenceRecipe(recipe);
    setIsShowSearchDialog(false);
  };

  // text content
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // post request to upload post
  const { mutate } = useAddMyCook("myCookPosts");

  const nextPage = () => {
    navigate("/community/my-cook");
  };

  const onConfirm = () => {
    mutate(
      {
        uri: "/community/gallery",
        sendData: {
          content: convertToHTML(editorState.getCurrentContent()),
          image: image,
          recipe_id: referenceRecipe.id,
        },
      },
      {
        onSuccess: () => {
          nextPage();
        },
      }
    );
  };

  const validation = () => {
    if (image.length > 0) {
      return false;
    }
    return true;
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
      <MyCookWriteReferenceRecipe
        onClick={() => {
          setIsShowSearchDialog(true);
        }}
        referenceRecipe={referenceRecipe}
      />

      {/* search modal */}
      <MyCookWriteSearchDialog
        isShowSearchDialog={isShowSearchDialog}
        setIsShowSearchDialog={setIsShowSearchDialog}
        onRecipeItemClicked={onRecipeItemClicked}
      />

      {/* content */}
      <FreeBoardWriteEditorContainer style={{ m: 0, mt: 2 }}>
        <EditorWithImage
          editorState={editorState}
          setEditorState={setEditorState}
        />
      </FreeBoardWriteEditorContainer>

      {/* confirm and cancle */}
      <WriteButtonBar
        confirmDisabled={validation()}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </ReponsiveContainer>
  );
};

export default MyCookWriter;
