import { useMutation, useQueryClient } from "react-query";
import http from "../utils/http-commons";

export default function usePostData(queryKey) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ uri, sentData }) => {
      const { data } = await http.post(uri, sentData);
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
}
