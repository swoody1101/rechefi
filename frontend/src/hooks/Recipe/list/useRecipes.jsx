import { useEffect, useState } from "react";
import { Warn } from "../../../common/components/sweatAlert";
import http from "../../../utils/http-commons";

export function useRecipes() {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = (page_num = 0) => {
    http
      .get(`/recipe/${page_num}`)
      .then((response) => {
        if (response.data.message === "success") {
          setRecipes(recipes.concat(response.data.data.post));
        }
      })
      .catch((error) => {
        Warn(`${error} 레시피를 불러오는 중 문제가 발생하였습니다`);
      });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return [recipes, getRecipes];
}
