import { useMutation, useQueryClient } from "react-query";
import { Success } from "../../common/components/sweatAlert";
import http from "../../utils/http-commons";

export default function useAddMyCook(uniqueKey) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ uri, sendData }) => {
      const { data } = await http.post(uri, {
        title: "타이틀",
        content: sendData.content,
        img_url: sendData.imageUploadUrl,
        category: 0,
        recipe_id: 0,
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
