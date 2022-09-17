import React, { useState } from "react";
import { Container } from "@mui/material";
import RecipeWriteTitleInput from "./components/recipe_write_title_input";
import RecipeListFilterTags from "../List/components/filter/tag/recipe_list_filter_tags";
import RecipeWriteBox from "./components/recipe_write_box";
import RecipeWriteIngredInputs from "./components/recipe_write_ingredient_list";
import RecipeWriteAddCotentBar from "./components/recipe_write_add_content_bar";

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
      <RecipeWriteAddCotentBar />
    </Container>
  );
}

export default RecipeWritePage;
