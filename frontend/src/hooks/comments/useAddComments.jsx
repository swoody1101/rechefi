import { useMutation, useQueryClient } from "react-query";
import http from "../../utils/http-commons";

export function useAddComment(articleId, queryKey) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ articleId, uri, sendData }) => {
      const response = await http.post(uri + articleId, {
        content: sendData.content,
        root: sendData.root,
        group: sendData.group,
        sequence: sendData.sequence,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
}
