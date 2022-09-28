import { useEffect, useState } from "react";
import { Warn } from "../../../common/components/sweatAlert";
import http from "../../../utils/http-commons";

export function useRecipes() {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = (recipe_id = 1) => {
    http
      .get(`/recipe/${recipe_id}`)
      .then((response) => {
        if (response.data.message === "success") {
          setRecipes(recipes.concat(response.data.data));
        }
      })
      .catch((error) => {
        Warn(`${error} 서버에 연결중 문제가 발생하였습니다`);
      });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return [recipes, getRecipes];
}
