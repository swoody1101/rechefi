import { useEffect, useState } from "react";
import { AiAreaTextWrapper } from "../styles/recipe_ai_styles";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import { AiVoiceTimer } from "./ai_voice_timer";
import { AiVoiceRequest } from "./ai_voice_request";
import { QueryClient } from "react-query";

const AiListen = () => {
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
    <>
      <AudioReactRecorder
        state={recordState}
        onStop={recStop}
        canvasWidth="0"
        canvasHeight="0"
      ></AudioReactRecorder>
      {audioFile === undefined ? (
        <div>지금 듣는 중입니다...</div>
      ) : (
        <div>
          <AiVoiceRequest audioFile={audioFile} />
        </div>
      )}
      <div>{recTrigger && <AiVoiceTimer recordeStop={recordeStop} />}</div>
    </>
  );
};

export default AiListen;
