import React, { useState } from "react";
import RecipeListBests from "./components/recipe_list_bests";
import RecipeList from "./components/recipe_list";
import RecipeListFab from "./components/recipe_list_fab";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useCallback } from "react";
import { useMemo } from "react";

function RecipeListView() {
  // DEBUG
  const data = useMemo(
    () => [
      {
        img: "../../../../assets/img/food_example_1.jpg",
        title: "자취생도 만들 수 있는 탕수육",
        author: "조보아씨 일루와봐유",
        views: 1576,
        likes: 30,
        id: 1,
      },
      {
        img: "../../../../assets/img/food_example_1.jpg",
        title: "자취생도 만들 수 있는 탕수육",
        author: "조보아씨 일루와봐유",
        views: 1576,
        likes: 30,
        id: 2,
      },
      {
        img: "../../../../assets/img/food_example_1.jpg",
        title: "자취생도 만들 수 있는",
        author: "조보아씨 일루와봐유",
        views: 1576,
        likes: 30,
        id: 3,
      },
      {
        img: "../../../../assets/img/food_example_1.jpg",
        title: "자취생도 만들 수 있는",
        author: "조보아씨 일루와봐유",
        views: 1576,
        likes: 30,
        id: 4,
      },
      {
        img: "../../../../assets/img/food_example_1.jpg",
        title: "자취생도 만들 수 있는",
        author: "조보아씨 일루와봐유",
        views: 1576,
        likes: 30,
        id: 5,
      },
      {
        img: "../../../../assets/img/food_example_1.jpg",
        title: "자취생도 만들 수 있는 탕수육",
        author: "조보아씨 일루와봐유",
        views: 1576,
        likes: 30,
        id: 11,
      },
      {
        img: "../../../../assets/img/food_example_1.jpg",
        title: "자취생도 만들 수 있는 탕수육",
        author: "조보아씨 일루와봐유",
        views: 1576,
        likes: 30,
        id: 12,
      },
      {
        img: "../../../../assets/img/food_example_1.jpg",
        title: "자취생도 만들 수 있는",
        author: "조보아씨 일루와봐유",
        views: 1576,
        likes: 30,
        id: 13,
      },
      {
        img: "../../../../assets/img/food_example_1.jpg",
        title: "자취생도 만들 수 있는",
        author: "조보아씨 일루와봐유",
        views: 1576,
        likes: 30,
        id: 14,
      },
      {
        img: "../../../../assets/img/food_example_1.jpg",
        title: "자취생도 만들 수 있는",
        author: "조보아씨 일루와봐유",
        views: 1576,
        likes: 30,
        id: 15,
      },
    ],
    []
  );

  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [bestRecipes, setBestRecipes] = useState([]);

  /**
   * add recipe list item
   * @param {Integer} nAddedRecipes number of added recipes
   */
  const addRecipesBeingShown = useCallback(
    async (nAddedRecipes) => {
      // for spinner UI
      setLoading(true);

      if (recipes.length + nAddedRecipes <= data.length) {
        await setTimeout(() => {
          setRecipes(
            recipes.concat(
              data.slice(
                recipes.length,
                recipes.length + nAddedRecipes
              )
            )
          );
        }, 1000);
      }

      setLoading(false);
    },
    [recipes, setLoading, data]
  );

  let ticking = false;
  const onScroll = useCallback(() => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        let documentScrollPos =
          window.scrollY + window.innerHeight;

        // if scroll end
        if (
          documentScrollPos ===
          document.documentElement.scrollHeight
        ) {
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

  // list Value init
  useEffect(() => {
    setRecipes(data.slice(0, 5));
    setBestRecipes(data.slice(0, 5));
  }, [data]);

  return (
    <Container sx={{ p: 2 }}>
      <RecipeListBests bestRecipes={bestRecipes} />
      <RecipeList recipes={recipes} loading={loading} />
      <RecipeListFab />
    </Container>
  );
}

export default RecipeListView;
