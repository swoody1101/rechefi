import { useEffect, useState } from "react";
import { Warn } from "../../common/components/sweatAlert";
import http from "../../utils/http-commons";

function useModified(postId, isNotice) {
  const [modified, setModified] = useState(null);

  // get modified post data from server
  useEffect(() => {
    if (postId !== -1) {
      http
        .get(
          `/community/${
            isNotice ? "notice-board" : "free-board"
          }/detail/${postId}`
        )
        .then((response) => {
          if (response.data.message === "success") {
            setModified(response.data.data);
          } else {
            throw new Error(response.data.message);
          }
        })
        .catch(() => {
          Warn("수정할 글을 불러오지 못했습니다");
        });
    }
  }, []);

  return [modified, setModified];
}

export default useModified;
