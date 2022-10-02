import { useMutation, useQueryClient } from "react-query";
import { Warn } from "../common/components/sweatAlert";
import http from "../utils/http-commons";

function handleError(error) {
  if (error.response.status === 401) {
    Warn("로그인이 필요합니다");
  } else if (error.response.status === 405) {
    Warn("올바르지 않은 요청입니다");
  } else {
    Warn(`${error.code}\n 서버와 통신중 문제가 발생하였습니다`);
  }
}

export function usePost(queryKey) {
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
      onError: (error) => {
        handleError(error);
      },
    }
  );
}

export function useDelete(queryKey) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ uri }) => {
      const { data } = await http.delete(uri);
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(queryKey);
      },
      onError: (error) => {
        handleError(error);
      },
    }
  );
}

export function usePut(queryKey) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ uri, sentData }) => {
      const { data } = await http.put(uri, sentData);
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(queryKey);
      },
      onError: (error) => {
        handleError(error);
      },
    }
  );
}
