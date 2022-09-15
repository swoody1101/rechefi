import React, { useState } from "react";
import { Container } from "@mui/material";
import RecipeWriteTitleInput from "./components/recipe_write_title_input";

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

  return (
    <Container sx={{ p: 1 }}>
      <RecipeWriteTitleInput
        value={title}
        onChange={onTitleChange}
        placeholder="제목을 입력하세요"
        validation={titleValidation}
        errorMessage={"1 - 21자내로 입력해요"}
      />
    </Container>
  );
}

export default RecipeWritePage;
