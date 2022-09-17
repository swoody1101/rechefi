import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import RecipeWriteTitleInput from "./components/recipe_write_title_input";
import RecipeListFilterTags from "../List/components/filter/tag/recipe_list_filter_tags";
import RecipeWriteBox from "./components/recipe_write_box";

function RecipeWritePage() {
  // control title data
  const [title, setTitle] = useState(null);
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const titleValidation = () => {
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

  return (
    <Container sx={{ p: 1 }}>
      {/* title */}
      <RecipeWriteTitleInput
        value={title}
        onChange={onTitleChange}
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
    </Container>
  );
}

export default RecipeWritePage;
