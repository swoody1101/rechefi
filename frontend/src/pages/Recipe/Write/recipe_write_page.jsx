import React, { useState } from "react";
import { Button, Container } from "@mui/material";
import RecipeWriteTitleInput from "./components/recipe_write_title_input";
import RecipeListFilterTags from "../List/components/filter/tag/recipe_list_filter_tags";
import RecipeWriteBox from "./components/recipe_write_box";
import RecipeWriteIngredInputs from "./components/recipe_write_ingredient_list";
import RecipeWriteAddCotentBar from "./components/recipe_write_add_content_bar";
import RecipeWriteContentBlock from "./components/recipe_write_content_block";

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
    { content: "asdf" },
    { content: "asdfasdf" },
    { content: "asdfasdfasdf" },
  ]);

  const addBlock = (type) => {
    if (type === "text") {
      setContents([...contents, {}]);
    } else if (type === "image") {
    }
  };

  const deleteBlock = (index) => {
    setContents(
      contents.filter((ele, idx) => index !== idx)
    );
  };

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
          // <RecipeWriteContents
          //   key={index}
          //   contentList={contents}
          //   setContentList={setContents}
          // ></RecipeWriteContents>

          <RecipeWriteContentBlock
            key={index}
            index={index}
            onDelete={deleteBlock}
            onIndexUp={upBlockPos}
            onIndexDown={downBlockPos}
          >
            <Button>{block.content}</Button>
          </RecipeWriteContentBlock>
        );
      })}
      <RecipeWriteAddCotentBar addContent={addBlock} />
    </Container>
  );
}

export default RecipeWritePage;
