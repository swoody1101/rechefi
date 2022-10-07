import { useMutation, useQueryClient } from "react-query";
import http from "../../utils/http-commons";

export default function useDeleteMyCook(uniqueKey) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ uri, article_id }) => {
      const { data } = await http.delete(uri + article_id);

      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(uniqueKey);
      },
    }
  );
}
