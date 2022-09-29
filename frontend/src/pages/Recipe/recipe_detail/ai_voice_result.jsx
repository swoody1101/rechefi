import { useQuery } from "react-query";
import http from "../../../utils/http-commons";
import { getToken } from "../../../utils/JWT-token";

const AiVoiceResult = ({ audioFile }) => {
  //   console.log("audioFile", audioFile);
  const sound = new File([audioFile.blob], "soundBlob", {
    lastModified: new Date().getTime(),
    type: "audio/wav",
  });
  console.log(sound);
  const loginToken = getToken();
  const formdata = new FormData();
  formdata.append("file", sound);
  const { data, isLoading } = useQuery("AiSTT", async () => {
    console.log("test");
    const response = await http.post(`/recipe/speech-to-text`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${loginToken}`,
      },
    });

    return response.data;
  });
  console.log(data);
  if (isLoading) {
    return <div>로딩중...</div>;
  }
  return <div>{data.message}</div>;
};

export default AiVoiceResult;
