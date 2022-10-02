import { Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestAiThunk } from "../../../store/module/AiReducer";
import { getToken } from "../../../utils/JWT-token";
import AiVoiceResult from "./ai_voice_result";

const VoiceRequest = ({ audioFile, synth, toggleAI, recognition }) => {
  const aiSpeech = window.speechSynthesis;
  const aiRequest = useSelector((store) => store.aiReducer.aiRequest);
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
  const formdata = new FormData();
  formdata.append("file", sound);

  return (
    <div>
      {aiRequest.isLoading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <AiVoiceResult
          data={aiRequest.data}
          synth={synth}
          toggleAI={toggleAI}
          recognition={recognition}
        />
      )}
    </div>
  );
};

export const AiVoiceRequest = React.memo(VoiceRequest);
