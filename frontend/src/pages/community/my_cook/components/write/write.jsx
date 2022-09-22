import { useState } from "react";
import { Backdrop } from "../../../../../common/styles/sidebar_styles";
import { WriteAreaWrapper } from "../../styles/write/write_page_styles";
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

const MyCookWriter = () => {
  const [searchModal, setSearchModal] = useState(false);
  const [imageUploadUrl, setImageUploadUrl] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const { mutate } = useAddMyCook("myCookPosts");

  const uploadHandler = (keyword) => {
    setImageUploadUrl(keyword);
    console.log(keyword);
  };

  const textHandler = (keyword) => {
    setContent(keyword);
  };

  return (
    <WriteWrapper>
      {searchModal && (
        <div>
          <RecipeModal />
          <Backdrop
            onClick={() => {
              setSearchModal(false);
            }}
          />
        </div>
      )}
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
      </RecipeListSearchWithResultDiv>
      <WriteAreaWrapper>
        <UploadImageArea uploadHandler={uploadHandler} />
        <WriteTextArea textHandler={textHandler} />
      </WriteAreaWrapper>
      <WriteButton
        onClick={() => {
          mutate(
            {
              uri: "/community/gallery",
              sendData: { content, imageUploadUrl },
            },
            {
              onSuccess: (data) => {
                navigate("/community/my-cook");
              },
            }
          );
        }}
      >
        글 등록
      </WriteButton>
    </WriteWrapper>
  );
};

export default MyCookWriter;
