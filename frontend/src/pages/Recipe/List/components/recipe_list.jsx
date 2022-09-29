import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import RecipeListItem from "./recipe_list_item";
import RecipeListFilter from "./filter/recipe_list_filter_container";
import RecipeListLoadingSpinner from "./recipe_list_loading_spinner";

function RecipeList({ recipes, loading, onRecipeItemClicked }) {
  const [filter, setFilter] = useState({
    tags: [],
    ingreds: [],
  });

  // recipes data render
  const recipeItems = recipes.map((recipe) => {
    // validate tags filter
    let isTagFilterd = filter.tags.length === 0 ? true : false;
    if (recipe.tags !== undefined) {
      for (let i = 0; i < filter.tags.length; i++) {
        for (let j = 0; j < recipe.tags.length; j++) {
          if (filter.tags[i] === recipe.tags[j].id) {
            isTagFilterd = true;
          }
        }
      }
    }
    if (!isTagFilterd) return null;

    // validate ingredient filter
    let isIngredFilterd = filter.ingreds.length === 0 ? true : false;
    if (recipe.ingredients !== undefined) {
      for (let i = 0; i < filter.ingreds.length; i++) {
        for (let j = 0; j < recipe.ingredients.length; j++) {
          // include
          if (
            filter.ingreds[i].name === recipe.ingredients[j].name &&
            filter.ingreds[i].include
          ) {
            isIngredFilterd = true;
          }
        }
      }
    }

    // validate ingredient filter
    if (recipe.ingredients !== undefined) {
      for (let i = 0; i < filter.ingreds.length; i++) {
        for (let j = 0; j < recipe.ingredients.length; j++) {
          // exclude
          if (
            !filter.ingreds[i].include &&
            filter.ingreds[i].name !== recipe.ingredients[j].name
          ) {
            isIngredFilterd = true;
          }
        }
      }
    }
    if (!isIngredFilterd) return null;

    return (
      <RecipeListItem
        key={recipe.id}
        recipe={recipe}
        onClick={() => onRecipeItemClicked(recipe.id, recipe.title)}
      />
    );
  });

  return (
    <Container>
      <RecipeListFilter onFilterApplied={setFilter} />
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
