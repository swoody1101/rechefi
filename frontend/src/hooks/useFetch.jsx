import { useInfiniteQuery, useQuery } from "react-query";
import http from "../utils/http-commons";

export default function useFetchList({ queryKey, articleId, uri }) {
  return useInfiniteQuery(
    queryKey,
    async ({ pageParam = articleId }) => {
      const response = await http.get(uri + pageParam);
      return {
        result: response.data,
        nextPage: pageParam + 100,
        isLast: response.data.isLast,
      };
    },
    {
      getNextPageParam: (lastPage) => {
        console.log(lastPage);
        return lastPage.isLast === undefined ? undefined : lastPage.nextPage;
      },
    }
  );
}

export function useFetchDetail({ queryKey, articleId, uri }) {
  return useQuery([queryKey, articleId], async () => {
    const response = await http.get(uri + articleId);
    return response.data;
  });
}

export function useFetchComments({ queryKey, articleId, uri }) {
  return useQuery(
    [queryKey, articleId],
    async () => {
      const response = await http.get(uri + articleId);
      return response.data;
    },
    {
      select: (data) => {
        const sortData = data.data.sort(function (a, b) {
          if (a.group > b.group) {
            return 1;
          }
          if (a.group === b.group) {
            if (a.sequence > b.sequence) {
              return 1;
            }
            if (a.sequence < b.sequence) {
              return -1;
            }
          }
          if (a.group < b.group) {
            return -1;
          }
          return 0;
        });
        return sortData;
      },
    }
  );
}