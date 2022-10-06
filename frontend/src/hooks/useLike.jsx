import { useMutation, useQueryClient } from "react-query";
import http from "../utils/http-commons";

export function useLike(queryKey) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ articleId, uri }) => {
      const response = await http.post(uri + articleId);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
}
