import { useEffect, useState } from "react";
import { Warn } from "../../../common/components/sweatAlert";
import http from "../../../utils/http-commons";

export function useBestRecipes() {
  const [bestRecipes, setBestRecipes] = useState([]);

  const getBestRecipes = () => {
    http
      .get("/main/best-recipe")
      .then((response) => {
        if (response.data.message === "success") {
          setBestRecipes(response.data.data.slice(0, 5));
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((error) => {
        Warn(`${error} 서버와 연결중 문제가 발생하였습니다`);
      });
  };

  useEffect(() => {
    getBestRecipes();
  }, []);

  return [bestRecipes, getBestRecipes];
}
