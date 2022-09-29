import { useEffect, useState } from "react";
import { Warn } from "../../common/components/sweatAlert";
import http from "../../utils/http-commons";

function useModified(postId, isNotice) {
  const [modified, setModified] = useState();

  // get modified post data from server
  useEffect(() => {
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
        Warn("수정할 글을 불러오는 중 문제가 발생하였습니다");
      });
  }, []);

  return [modified, setModified];
}

export default useModified;
