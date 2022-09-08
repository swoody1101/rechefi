import React from "react";
import RecipeListBests from "./components/recipe_list_bests";
import RecipeList from "./components/recipe_list";
import RecipeListFab from "./components/recipe_list_fab";
import { Container } from "@mui/material";

function RecipeListView() {
  // DEBUG
  const data = [
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
  ];

  return (
    <Container sx={{p:2}}>
      <RecipeListBests bestRecipes={data} />
      <RecipeList recipes={data} />
      <RecipeListFab />
    </Container>
  );
}

export default RecipeListView;
