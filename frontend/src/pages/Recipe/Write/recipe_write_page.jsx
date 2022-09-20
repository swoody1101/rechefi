import React, { useState, useRef } from "react";
import { Container } from "@mui/material";
import RecipeWriteTitleInput from "./components/recipe_write_title_input";
import RecipeListFilterTags from "../List/components/filter/tag/recipe_list_filter_tags";
import RecipeWriteBox from "./components/recipe_write_box";
import RecipeWriteIngredInputs from "./components/recipe_write_ingredient_list";
import RecipeWriteAddCotentBar from "./components/recipe_write_add_content_bar";
import RecipeWriteContentBlock from "./components/recipe_write_content_block";
import { Warn } from "../../../utils/sweatAlert";
import { uploadImage } from "../../../utils/http-multipart";
import RecipeWriteContentImage from "./components/recipe_write_content_img";
import RecipeWriteContentText from "./components/recipe_write_content_text";

function RecipeWritePage() {
  // control title data
  const [title, setTitle] = useState(null);

  const titleValidation = () => {
    // dismiss value at first
    if (title === null) return true;
    if (0 < title.length && title.length < 17) return true;
    else return false;
  };

  // control tag information
  const [selectedTags, setSelectedTags] = useState([]);

  const addTag = (tag_id) => {
    setSelectedTags([...selectedTags, tag_id]);
  };

  const deleteTag = (tag_id) => {
    setSelectedTags(
      selectedTags.filter((tag) => tag !== tag_id)
    );
  };

  // ingredients for recipe
  const [ingreds, setIngred] = useState([]);

  // recipe contents
  const [contents, setContents] = useState([
    { type: "text", content: "asdf" },
    {
      type: "image",
      content:
        "https://cdn.discordapp.com/attachments/733699779179184308/992697011780472944/IMG_0758.png",
    },
    { type: "text", content: "asdfasdfasdf" },
  ]);

  // add text or image block
  const imageInput = useRef();
  const addBlock = (type) => {
    if (type === "text") {
      setContents([
        ...contents,
        { type: "text", content: "" },
      ]);
    } else if (type === "image") {
      // activate image input
      imageInput.current.click();
    }
  };

  const deleteBlock = (index) => {
    setContents(
      contents.filter((ele, idx) => index !== idx)
    );
  };

  const inputLocalImage = async (e) => {
    const image = e.target.files[0];
    if (!!!image) return;

    // check image size
    const maxAllowedSize = 5 * 1024 * 1024;
    if (image.size > maxAllowedSize) {
      Warn("파일 크기는 5MB를 넘을 수 없습니다");
      return;
    }

    // check image name
    let fileName = image.name;
    let fileDot = fileName.lastIndexOf(".");
    let fileType = fileName
      .substring(fileDot + 1, fileName.length)
      .toLowerCase();

    if (fileType !== "png" && fileType !== "jpg") {
      Warn("지원하지 않는 확장자입니다");
      return;
    }

    // upload to server
    const formData = new FormData();
    formData.append("image", image);
    const res = await uploadImage(formData);

    // add to content
    if (!isNaN(res)) {
      setContents([
        ...contents,
        { type: "image", content: res },
      ]);
    } else {
      Warn("업로드 중 문제가 발생하였습니다");
    }

    // reset input
    e.target.files[0] = "";
  };

  // handle block position
  const downBlockPos = (index) => {
    if (index === 0) return;

    setContents([
      ...contents.slice(0, index - 1),
      contents[index],
      contents[index - 1],
      ...contents.slice(index + 1),
    ]);
  };
  const upBlockPos = (index) => {
    if (index === contents.length - 1) return;

    setContents([
      ...contents.slice(0, index),
      contents[index + 1],
      contents[index],
      ...contents.slice(index + 2),
    ]);
  };

  return (
    <Container sx={{ p: 1 }}>
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
        <RecipeListFilterTags
          onTagAdded={addTag}
          onTagDeleted={deleteTag}
        />
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
              />
            ) : (
              <RecipeWriteContentText />
            )}
          </RecipeWriteContentBlock>
        );
      })}
      <RecipeWriteAddCotentBar addContent={addBlock} />
      {/* hidden image input */}
      <input
        accept="image/jpeg, image/png"
        type="file"
        style={{ display: "none" }}
        ref={imageInput}
        onChange={(e) => inputLocalImage(e)}
      />
    </Container>
  );
}

export default RecipeWritePage;
