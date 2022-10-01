import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestAiThunk } from "../../../store/module/AiReducer";
import { getToken } from "../../../utils/JWT-token";
import AiVoiceResult from "./ai_voice_result";

const VoiceRequest = ({ audioFile }) => {
  const aiSpeech = window.speechSynthesis;
  const aiRequest = useSelector((store) => store.aiReducer.aiRequest);

  console.log(aiRequest.isLoading);

  const [loading, setLoading] = useState(true);
  const sound = useState(
    new File([audioFile.blob], "soundBlob", {
      lastModified: new Date().getTime(),
      type: "audio/wav",
    })
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (loading) {
      dispatch(requestAiThunk(sound[0]));
      setLoading(false);
    }
  }, [loading]);
  console.log(sound);
  // const loginToken = getToken();
  const formdata = new FormData();
  formdata.append("file", sound);

  return (
    <div>
      {aiRequest.isLoading ? (
        <div>처리중...</div>
      ) : (
        <AiVoiceResult data={aiRequest.data} />
      )}
    </div>
  );
};

export const AiVoiceRequest = React.memo(VoiceRequest);
