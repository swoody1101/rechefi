import React from "react";
import { Box, Container } from "@mui/material";
import RecipeListItem from "./recipe_list_item";
import RecipeListFilter from "./recipe_list_filter_container";
import RecipeListLoadingSpinner from "./recipe_list_loading_spinner";

function RecipeList({ recipes, loading }) {
  // recipes data render
  const recipeItems = recipes.map((recipe) => (
    <RecipeListItem key={recipe.id} recipe={recipe} />
  ));

  return (
    <Container>
      <RecipeListFilter />
      <Box>{recipeItems}</Box>
      <RecipeListLoadingSpinner loading={loading} />
    </Container>
  );
}

RecipeList.defaultProps = {
  recipes: [],
  loading: false,
};

export default RecipeList;
