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
import http from "../../../../../utils/http-commons";
import { useMutation, useQueryClient } from "react-query";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const postWrite = async ({ content, imageUploadUrl }) => {
  console.log(imageUploadUrl);
  const { data } = await http.post("/community/gallery", {
    title: "타이틀",
    content: content,
    img_url: imageUploadUrl,
    category: 0,
    recipe_id: 0,
  });
  console.log(data);
  return data;
};

const MyCookWriter = () => {
  const [searchModal, setSearchModal] = useState(false);
  const [imageUploadUrl, setImageUploadUrl] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const uploadHandler = (keyword) => {
    setImageUploadUrl(keyword);
    console.log(keyword);
  };

  const textHandler = (keyword) => {
    setContent(keyword);
    console.log(keyword);
  };

  const { mutate, isSuccess } = useMutation(postWrite, {
    onMutate: () => {
      queryClient.invalidateQueries("myCookPosts");
    },
    onSuccess: (data) => {
      console.log(data);
      navigate("/community/my-cook");
    },
  });

  if (isSuccess) {
  }

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
      <WriteButton
        onClick={() => {
          mutate({ content, imageUploadUrl });
        }}
      >
        글 등록
      </WriteButton>
    </WriteWrapper>
  );
};

export default MyCookWriter;
