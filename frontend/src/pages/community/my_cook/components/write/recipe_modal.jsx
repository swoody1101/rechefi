import { TextField } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import RecipeList from "../../../../Recipe/List/components/recipe_list";
import {
  RecipeListModal,
  RecipeListSearchWrapper,
  RecipeListWrapper,
} from "../../styles/write_styles";
import SearchIcon from "@mui/icons-material/Search";

const RecipeModal = () => {
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
        tags: [{ id: 1 }, { id: 2 }],
        ingredients: [{ name: "파" }, { name: "양파" }],
      },
      {
        img: "../../../../assets/img/food_example_1.jpg",
        title: "자취생도 만들 수 있는 탕수육",
        author: "조보아씨 일루와봐유",
        views: 1576,
        likes: 30,
        id: 2,
        tags: [{ id: 2 }],
        ingredients: [{ name: "양파" }],
      },
      {
        img: "../../../../assets/img/food_example_1.jpg",
        title: "자취생도 만들 수 있는",
        author: "조보아씨 일루와봐유",
        views: 1576,
        likes: 30,
        id: 3,
        tags: [],
        ingredients: [],
      },
      {
        img: "../../../../assets/img/food_example_1.jpg",
        title: "자취생도 만들 수 있는",
        author: "조보아씨 일루와봐유",
        views: 1576,
        likes: 30,
        id: 4,
        tags: [],
        ingredients: [],
      },
      {
        img: "../../../../assets/img/food_example_1.jpg",
        title: "자취생도 만들 수 있는",
        author: "조보아씨 일루와봐유",
        views: 1576,
        likes: 30,
        id: 5,
        tags: [],
        ingredients: [],
      },
      {
        img: "../../../../assets/img/food_example_1.jpg",
        title: "자취생도 만들 수 있는 탕수육",
        author: "조보아씨 일루와봐유",
        views: 1576,
        likes: 30,
        id: 11,
        tags: [],
        ingredients: [],
      },
      {
        img: "../../../../assets/img/food_example_1.jpg",
        title: "자취생도 만들 수 있는 탕수육",
        author: "조보아씨 일루와봐유",
        views: 1576,
        likes: 30,
        id: 12,
        tags: [],
        ingredients: [],
      },
      {
        img: "../../../../assets/img/food_example_1.jpg",
        title: "자취생도 만들 수 있는",
        author: "조보아씨 일루와봐유",
        views: 1576,
        likes: 30,
        id: 13,
        tags: [],
        ingredients: [],
      },
      {
        img: "../../../../assets/img/food_example_1.jpg",
        title: "자취생도 만들 수 있는",
        author: "조보아씨 일루와봐유",
        views: 1576,
        likes: 30,
        id: 14,
        tags: [],
        ingredients: [],
      },
      {
        img: "../../../../assets/img/food_example_1.jpg",
        title: "자취생도 만들 수 있는",
        author: "조보아씨 일루와봐유",
        views: 1576,
        likes: 30,
        id: 15,
        tags: [],
        ingredients: [],
      },
    ],
    []
  );

  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

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
              data.slice(recipes.length, recipes.length + nAddedRecipes)
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

  // list Value init
  useEffect(() => {
    setRecipes(data.slice(0, 5));
  }, [data]);
  const searchWordOnChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  const searchWordHandler = () => {
    console.log(searchKeyword);
  };
  return createPortal(
    <RecipeListModal>
      <RecipeListWrapper>
        <RecipeListSearchWrapper>
          <TextField
            onChange={searchWordOnChange}
            id="search"
            label="Search"
            variant="standard"
            sx={{ width: "80%" }}
          />
          <SearchIcon
            fontSize="large"
            sx={{ marginTop: "5%" }}
            onClick={searchWordHandler}
          />
        </RecipeListSearchWrapper>
        <RecipeList recipes={recipes} loading={loading} />
      </RecipeListWrapper>
    </RecipeListModal>,
    document.getElementById("myCookDetail")
  );
};

export default RecipeModal;
