import { useState } from "react";
import { Warn } from "../../../common/components/sweatAlert";
import http from "../../../utils/http-commons";

export function useSearchedIngreds() {
  const [searchedIngred, setSearchedIngred] = useState([]);

  const searchIngred = (keyword) => {
    http
      .get(`/recipe/ingredient?name=${keyword}`)
      .then((reponse) => {
        if (reponse.data.message === "success") {
          setSearchedIngred(reponse.data.data);
        }
      })
      .catch((error) => {
        Warn(`${error} 재료 검색 중 문제가 발생하였습니다`);
      });
  };

  return [searchedIngred, searchIngred];
}
