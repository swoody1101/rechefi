import { useMutation, useQueryClient } from "react-query";
import http from "../../utils/http-commons";

export default function useAddMyCook(uniqueKey) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ uri, sendData }) => {
      const { data } = await http.post(uri, {
        title: "타이틀",
        content: sendData.content,
        img_url: sendData.image,
        category: 0,
        recipe_id: sendData.recipe === null ? 0 : sendData.recipe.id,
      });
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(uniqueKey);
      },
    }
  );
}
