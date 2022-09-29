import React, { useState, useEffect, useCallback, useMemo } from "react";
import RecipeListBests from "./components/bests/recipe_list_bests";
import RecipeList from "./components/recipe_list";
import RecipeListFab from "./components/recipe_list_fab";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useBestRecipes } from "../../../hooks/Recipe/list/useBestRecipes";
import { useRecipes } from "../../../hooks/Recipe/list/useRecipes";
import { getToken } from "../../../utils/JWT-token";

function RecipeListPage() {
  const [recipes, getRecipes] = useRecipes();

  const [shownRecipes, setShownRecipes] = useState([]);
  const [bestRecipes] = useBestRecipes([]);
  const [loading, setLoading] = useState(false);

  // list Value init
  useEffect(() => {
    setShownRecipes(recipes.slice(0, 5));
  }, [recipes]);

  /**
   * add recipe list item
   * @param {Integer} nAddedRecipes number of added recipes
   */
  const addRecipesBeingShown = useCallback(
    async (nAddedRecipes) => {
      // for spinner UI
      // setLoading(true);
      // if (shownRecipes.length + nAddedRecipes <= recipes.length) {
      //   await setTimeout(() => {
      //     setShownRecipes(
      //       shownRecipes.concat(
      //         recipes.slice(
      //           shownRecipes.length,
      //           shownRecipes.length + nAddedRecipes
      //         )
      //       )
      //     );
      //   }, 1000);
      // } else {
      //   // TODO
      //   getRecipes();
      // }
      // setLoading(false);
    },
    [shownRecipes, setLoading, recipes]
  );

  let ticking = false;
  const onScroll = useCallback(() => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        let documentScrollPos = window.scrollY + window.innerHeight;

        // if scroll end
        if (documentScrollPos <= document.documentElement.scrollHeight - 20) {
          addRecipesBeingShown(5);
        }

        ticking = false;
      });
      ticking = true;
    }
  }, [addRecipesBeingShown]);

  // attach on Scroll event
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  const navigate = useNavigate();

  // see recipe detail
  const onRecipeItemClicked = (id, title) => {
    // const postId = id;
    navigate(`/recipe/postId=` + id);
  };

  return (
    <Container sx={{ pt: 2, px: 1, pb: 1 }}>
      <RecipeListBests bestRecipes={bestRecipes} />
      <RecipeList
        recipes={shownRecipes}
        loading={loading}
        onRecipeItemClicked={onRecipeItemClicked}
      />

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
