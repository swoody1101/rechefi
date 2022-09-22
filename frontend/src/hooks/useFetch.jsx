import { useInfiniteQuery, useQuery } from "react-query";
import http from "../utils/http-commons";

export default function useFetchList({ queryKey, articleId, uri }) {
  return useInfiniteQuery(
    [queryKey],
    async ({ pageParam = articleId }) => {
      const response = await http.get(uri + pageParam);
      return {
        result: response.data,
        nextPage: pageParam + 100,
        isLast: response.data.isLast,
      };
    },
    {
      getNextPageParam: (lastPage) =>
        !lastPage.isLast ? lastPage.nextPage : undefined,
    }
  );
}

export function useFetchDetail({ queryKey, articleId, uri }) {
  return useQuery([queryKey, articleId], async () => {
    const response = await http.get(uri + articleId);
    return response.data;
  });
}
