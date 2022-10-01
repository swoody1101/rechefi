import { useEffect, useState } from "react";
import { AiAreaTextWrapper } from "../styles/recipe_ai_styles";
import http from "../../../utils/http-commons";
import { getToken } from "../../../utils/JWT-token";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import AiVoiceTimer from "./ai_voice_timer";
import AiVoiceResult from "./ai_voice_result";
import { QueryClient } from "react-query";

const AiVoiceListenArea = ({
  play,
  pause,
  prePlay,
  nextPlay,
  closeAiHandler,
  onPlay,
  toggleAI,
}) => {
  const [alertAudio] = useState(new Audio("/sound/alert.wav"));
  const [talk, setTalk] = useState("듣는 중입니다...");
  const [recTrigger, setRecTrigger] = useState(false);
  const [alertPlay, setAlertPlay] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [recordState, setRecordState] = useState(null);
  const [audioFile, setAudioFile] = useState(undefined);
  const queryClient = new QueryClient();
  useEffect(() => {
    queryClient.invalidateQueries("AiSTT");
    setAlertPlay((prev) => {
      return !prev;
    });
    setRecTrigger((prev) => {
      return !prev;
    });
  }, []);
  useEffect(() => {
    if (alertPlay) {
      alertAudio.load();
      alertAudio.play();
    } else {
      alertAudio.pause();
    }
  }, [alertPlay]);
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
    setRecTrigger((prev) => {
      return !prev;
    });
    setDisabled((prev) => {
      return !prev;
    });
  };
  const recStop = (audioData) => {
    console.log("audioData", audioData);
    setAudioFile(audioData);
  };
  return (
    <>
      <AudioReactRecorder
        state={recordState}
        onStop={recStop}
        canvasWidth="0"
        canvasHeight="0"
      ></AudioReactRecorder>
      {disabled ? <AiAreaTextWrapper>{talk}</AiAreaTextWrapper> : null}
      {audioFile !== undefined && (
        <AiVoiceResult
          play={play}
          pause={pause}
          prePlay={prePlay}
          nextPlay={nextPlay}
          closeAiHandler={closeAiHandler}
          audioFile={audioFile}
          onPlay={onPlay}
          toggleAI={toggleAI}
        />
      )}
      <div>{recTrigger && <AiVoiceTimer recordeStop={recordeStop} />}</div>
    </>
  );
};

export default AiVoiceListenArea;
