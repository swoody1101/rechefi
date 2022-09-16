import { useState } from "react";
import { Backdrop } from "../../../../../common/styles/sidebar_styles";
import { WriteAreaWrapper } from "../../styles/write_page_styles";
import {
  RecipeListSearchResultButton,
  RecipeListSearchWithResultDiv,
  WriteButton,
  WriteWrapper,
} from "../../styles/write_styles";
import EmptyWriteImage from "./empty_write_image";
import RecipeModal from "./recipe_modal";
import WriteTextArea from "./write_text";

const MyCookWriter = () => {
  const [searchModal, setSearchModal] = useState(false);
  const [imageUploadUrl, setImageUploadUrl] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState({});

  const uploadHandler = (keyword) => {
    setImageUploadUrl(keyword);
    console.log(keyword);
  };

  const textHandler = (keyword) => {
    setContent(keyword);
    console.log(keyword);
  };

  const postWrite = () => {
    setPost({
      title: "자랑게시판",
      content: content,
      iamge_url: imageUploadUrl,
    });
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
        <EmptyWriteImage uploadHandler={uploadHandler} />
        <WriteTextArea textHandler={textHandler} />
      </WriteAreaWrapper>
      <WriteButton onClick={postWrite}> 글 등록 </WriteButton>
    </WriteWrapper>
  );
};

export default MyCookWriter;
