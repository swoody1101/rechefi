import { useEffect, useState } from "react";
import { AiAreaTextWrapper } from "../styles/recipe_ai_styles";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import { AiVoiceTimer } from "./ai_voice_timer";
import { AiVoiceRequest } from "./ai_voice_request";
import { QueryClient } from "react-query";
import { Box, Card } from "@mui/material";

const AiListen = ({ synth, toggleAI, recognition }) => {
  const [alertAudio] = useState(new Audio("/sound/alert.wav"));
  const [playing, setPlaying] = useState(true);
  const [talk, setTalk] = useState("듣는 중입니다...");
  const [recTrigger, setRecTrigger] = useState(false);
  const [alertPlay, setAlertPlay] = useState(false);
  const [recordState, setRecordState] = useState(null);
  const [audioFile, setAudioFile] = useState(undefined);
  const queryClient = new QueryClient();
  useEffect(() => {
    setAlertPlay((prev) => {
      return !prev;
    });
  }, []);
  useEffect(() => {
    if (playing) {
      alertAudio.play();
    } else {
      alertAudio.pause();
      setRecTrigger(true);
    }
  }, [playing]);
  useEffect(() => {
    alertAudio.addEventListener("ended", () => {
      setPlaying(false);
    });
    return () => {
      alertAudio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  useEffect(() => {
    if (recTrigger) {
      recordeStart();
    }
  }, [recTrigger]);
  const recordeStart = () => {
    setRecordState(RecordState.START);
  };

  const recordeStop = () => {
    setRecordState(RecordState.STOP);
    setRecTrigger(false);
  };
  const recStop = (audioData) => {
    console.log(audioData);
    setAudioFile(audioData);
  };
  return (
    <Box sx={{ height: "100%" }}>
      <AudioReactRecorder
        state={recordState}
        onStop={recStop}
        canvasWidth="0"
        canvasHeight="0"
      ></AudioReactRecorder>
      {audioFile === undefined ? (
        <></>
      ) : (
        <div>
          <AiVoiceRequest
            audioFile={audioFile}
            synth={synth}
            recognition={recognition}
          />
        </div>
      )}
      <Box
        sx={{
          height: "100%",
          background: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {recTrigger ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>지금 듣고 있는 중입니다!</h2>
            <AiVoiceTimer recordeStop={recordeStop} />
          </Box>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {audioFile === undefined && <h2>신호음이 끝나면 말하세요!</h2>}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AiListen;
