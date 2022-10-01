import React from "react";
import { Box } from "@mui/material";
import RecipeListItem from "./recipe_list_item";

function RecipeList({ recipes, onRecipeItemClicked }) {
  return (
    <Box>
      {recipes.map((recipe) => (
        <RecipeListItem
          key={recipe.id}
          recipe={recipe}
          onClick={() => onRecipeItemClicked(recipe.id, recipe.title)}
        />
      ))}
    </Box>
  );
}

RecipeList.defaultProps = {
  recipes: [],
  loading: false,
};

export default RecipeList;
