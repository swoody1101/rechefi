import { useQuery } from "react-query";
import http from "../../../utils/http-commons";
import { getToken } from "../../../utils/JWT-token";
import AiVoiceReciveDispose from "./ai_voice_recive_dispose";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { requestAiThunk } from "../../../store/module/AiReducer";

const AiVoiceResult = ({
  audioFile,
  prePlay,
  nextPlay,
  pause,
  resume,
  play,
  closeAiHandler,
  onStop,
  onPlay,
  toggleAI,
}) => {
  //   console.log("audioFile", audioFile);
  const aiSpeech = window.speechSynthesis;
  const sound = new File([audioFile.blob], "soundBlob", {
    lastModified: new Date().getTime(),
    type: "audio/wav",
  });
  const aiRequest = useSelector((store) => store.aiRequestReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestAiThunk( sound ));
  }, []);
  console.log(aiRequest);
  console.log(sound);
  const loginToken = getToken();
  // const formdata = new FormData();
  // formdata.append("file", sound);
  // const { data, isLoading } = useQuery("AiSTT", async () => {
  //   const response = await http.post(`/recipe/speech-to-text`, formdata, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Authorization: `Bearer ${loginToken}`,
  //     },
  //   });

  //   // aiSpeech.cancel();
  //   return response.data;
  // });
  console.log(aiRequest.data);

  return (
    <div>
      {aiRequest.isLoading ? (
        <div>로딩중...</div>
      ) : (
        <AiVoiceReciveDispose
          play={play}
          resume={resume}
          prePlay={prePlay}
          nextPlay={nextPlay}
          pause={pause}
          closeAiHandler={closeAiHandler}
          data={aiRequest.data.data}
          onStop={onStop}
          onPlay={onPlay}
          toggleAI={toggleAI}
        />
      )}
    </div>
  );
};

export default AiVoiceResult;
