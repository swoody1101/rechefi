import { useEffect, useState } from "react";
import { Warn } from "../../../common/components/sweatAlert";
import http from "../../../utils/http-commons";

export function useTags() {
  const [tags, setTags] = useState([]);

  // get tags from server
  useEffect(() => {
    http
      .get("/recipe/tag")
      .then((response) => {
        let tagList = response.data.data;
        setTags(
          tagList.map((tag) => ({
            ...tag,
            selected: false,
          }))
        );
      })
      .catch(() => {
        Warn(
          "태그 목록을 불러오는 중 문제가 발생하였습니다"
        );
      });
  }, []);

  return [tags, setTags];
}
