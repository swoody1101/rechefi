import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import http from "../../../utils/http-commons";
import { convertToHTML } from "draft-convert";
import RecipeWriteTitleInput from "./components/title/recipe_write_title_input";
import RecipeListFilterTags from "../List/components/filter/tag/recipe_list_filter_tags";
import RecipeWriteBox from "./components/recipe_write_box";
import RecipeWriteIngredInputs from "./components/ingredient/recipe_write_ingredient_list";
import RecipeWriteAddCotentBar from "./components/recipe_write_add_content_bar";
import RecipeWriteContentBlock from "./components/content/recipe_write_content_block";
import RecipeWriteContentImage from "./components/content/recipe_write_content_img";
import RecipeWriteContentText from "./components/content/recipe_write_content_text";
import RecipeWriteBottombar from "./components/bottombar/recipe_write_bottombar";
import { Confirm, Success, Warn } from "../../../common/components/sweatAlert";
import { useSelectedTag } from "../../../hooks/Recipe/tag/useSelectedTags";
import { useTitle } from "../../../hooks/Recipe/write/useTitle";
import { useContents } from "../../../hooks/Recipe/write/useContents";
import InputImage from "../../../common/components/input_image";
import ReponsiveContainer from "../../../common/components/responsive_container";

function RecipeWritePage() {
  const navigate = useNavigate();

  // control title data
  const [title, setTitle, titleValidation] = useTitle();

  // control tag information
  const [selectedTags, addTag, deleteTag] = useSelectedTag();

  // ingredients for recipe
  const [ingreds, setIngred] = useState([]);

  // thumbnail
  const [thumbnail, setThumbnail] = useState("");

  // add text or image block
  const imageInput = useRef();

  // recipe contents
  const [
    contents,
    setContents,
    addTextBlock,
    addImageBlock,
    deleteBlock,
    updateTextContent,
    downBlockPos,
    upBlockPos,
  ] = useContents();

  const addBlock = (type) => {
    if (type === "text") {
      addTextBlock();
    } else if (type === "image") {
      // activate image input
      imageInput.current.click();
    }
  };

  // handle bottom bar buttons
  const writeComplete = () => {
    let first_image_link = "";

    // for processing
    let tmp_contents = "";
    contents.forEach((item, index) => {
      tmp_contents = tmp_contents.concat(
        item.type === "text"
          ? convertToHTML(item.content.getCurrentContent())
          : item.content
      );

      // add separator
      if (index !== contents.length - 1) {
        tmp_contents = tmp_contents.concat("```");
      }

      // setThumbnail first image
      if (
        item.type === "image" &&
        thumbnail === "" &&
        first_image_link === ""
      ) {
        first_image_link = item.content;
      }
    });

    let recipe = {
      title: title,
      ingredients: ingreds.filter((ingred) => ingred.name !== ""),
      tags: selectedTags,
      content: tmp_contents,
      img_url: thumbnail === "" ? first_image_link : thumbnail,
    };

    http
      .post("/recipe", recipe)
      .then((response) => {
        Success("레시피 작성이 완료되었습니다");
        navigate("/recipe", { replace: true });
      })
      .catch((error) => {
        Warn(`${error} + " : 레시피 작성 중 문제가 발생하였습니다`);
      });
  };

  // validation
  const inputValidation = () => {
    if (!title) return true;
    if (!titleValidation()) return true;
    return false;
  };

  const cancleWrite = () => {
    Confirm("작성을 중지합니까?", () => {
      navigate(-1);
    });
  };

  return (
    <ReponsiveContainer style={{ p: 1 }}>
      {/* title */}
      <RecipeWriteTitleInput
        value={title}
        setValue={setTitle}
        placeholder="제목을 입력하세요"
        validation={titleValidation}
        errorMessage={"1 - 21자내로 입력해요"}
      />
      {/* tags */}
      <RecipeWriteBox>
        <RecipeListFilterTags onTagAdded={addTag} onTagDeleted={deleteTag} />
      </RecipeWriteBox>
      {/* ingredients */}
      <RecipeWriteBox>
        <RecipeWriteIngredInputs
          ingredients={ingreds}
          setIngredients={setIngred}
        />
      </RecipeWriteBox>
      {/* content */}
      {contents.map((block, index) => {
        return (
          <RecipeWriteContentBlock
            key={index}
            index={index}
            onDelete={deleteBlock}
            onIndexUp={upBlockPos}
            onIndexDown={downBlockPos}
          >
            {/* image or text */}
            {block.type === "image" ? (
              <RecipeWriteContentImage
                link={block.content}
                thumbnail={thumbnail}
                setThumbnail={setThumbnail}
              />
            ) : (
              <RecipeWriteContentText
                index={index}
                initValue={block.content}
                onChange={updateTextContent}
              />
            )}
          </RecipeWriteContentBlock>
        );
      })}
      <RecipeWriteAddCotentBar addContent={addBlock} />
      <RecipeWriteBottombar
        confirmDisabled={inputValidation()}
        onConfirm={writeComplete}
        onCancel={cancleWrite}
      />

      <InputImage setRef={imageInput} onInput={addImageBlock} />
    </ReponsiveContainer>
  );
}

export default RecipeWritePage;
