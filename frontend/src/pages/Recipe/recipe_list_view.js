import { Container } from "@mui/material";
import React from "react";
import RecipeListItem from "./components/recipe_list_item";

function RecipeListView({ recipes }) {
  const recipeItems = recipes.map((recipe) => (
    <RecipeListItem key={recipe.id} recipe={recipe} />
  ));

  return (
    <>
      <Container></Container>
      <Container
        sx={{
          p: 2,
        }}
      >
        {recipeItems}
      </Container>
    </>
  );
}

export default RecipeListView;
