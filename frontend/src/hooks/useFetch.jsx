import { useInfiniteQuery, useQuery } from "react-query";
import http from "../utils/http-commons";

export default function useFetchList({ queryKey, articleId, uri }) {
  return useInfiniteQuery(
    queryKey,
    async ({ pageParam = articleId }) => {
      const response = await http.get(uri + pageParam);
      return {
        result: response.data,
        nextPage: pageParam + 1,
        isLast: response.data.isLast,
      };
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.result.data.current_page <
          lastPage.result.data.total_pages
          ? lastPage.nextPage
          : undefined;
      },
    }
  );
}

export function useFetchDetail({ queryKey, articleId, uri }) {
  return useQuery(
    [queryKey, articleId],
    async () => {
      const response = await http.get(uri + articleId);
      return response.data;
    },
    { refetchOnWindowFocus: false }
  );
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

export function useFetch({ queryKey, param, uri }) {
  return useQuery([queryKey], async () => {
    const response = await http.get(`${uri}${param ? `/${param}` : ""}`);
    if (response.data.message === "success") return response.data.data;
    else return undefined;
  });
}
