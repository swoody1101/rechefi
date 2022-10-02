import React, { useEffect, useState } from "react";
import RecipeListBests from "./components/bests/recipe_list_bests";
import RecipeList from "./components/recipe_list";
import RecipeListFab from "./components/recipe_list_fab";
import useFetchList from "../../../hooks/useFetch";
import { Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useBestRecipes } from "../../../hooks/Recipe/list/useBestRecipes";
import { getToken } from "../../../utils/JWT-token";
import { useInView } from "react-intersection-observer";
import RecipeListLoadingSpinner from "./components/recipe_list_loading_spinner";

function RecipeListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  // get search keywords
  let query = "";
  if (state) {
    if (state.keyword) query += `title=${state.keyword}&`;
    if (state.tags) {
      if (state.tags.length !== 0) {
        query += "tag=";
        state.tags.forEach((tag, idx) => {
          query += `${tag}${idx !== state.tags.length - 1 ? "," : "&"}`;
        });
      }
    }

    if (state.ingreds) {
      if (state.ingreds && state.ingreds.length !== 0) {
        query += "ingredient=";
        state.ingreds.forEach((ingred, idx) => {
          query += `${ingred.name}${
            idx !== state.ingreds.length - 1 ? "," : ""
          }`;
        });
      }
    }
  }

  // loading best Recipe
  const [bestRecipes] = useBestRecipes([]);

  // recipe List loading
  const { data, isLoading, fetchNextPage, hasNextPage } = useFetchList({
    queryKey: "RECIPES",
    articleId: 1,
    uri: "/recipe/",
    query: query,
  });

  // for infinity scroll trigger
  const [ref, inView] = useInView();

  // loading scroll
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  // see recipe detail
  const onRecipeItemClicked = (id, title) => {
    // const postId = id;
    navigate(`/recipe/postId=` + id);
  };

  return (
    <Container sx={{ pt: 2, px: 1, pb: 1 }}>
      <RecipeListBests bestRecipes={bestRecipes} />
      <Container sx={{ mt: 2 }}>
        {isLoading ? (
          <RecipeListLoadingSpinner loading={isLoading} />
        ) : (
          data.pages.map((page, index) => (
            <RecipeList
              key={index}
              recipes={page.result.data.post}
              loading={isLoading}
              onRecipeItemClicked={onRecipeItemClicked}
            />
          ))
        )}
      </Container>

      {/* for infinity scroll trigger */}
      <Container ref={ref}></Container>

      {/* show write btn when login */}
      {getToken() ? (
        <RecipeListFab
          onClick={() => {
            navigate("/recipe/write");
          }}
        />
      ) : (
        ""
      )}
    </Container>
  );
}

export default RecipeListPage;
