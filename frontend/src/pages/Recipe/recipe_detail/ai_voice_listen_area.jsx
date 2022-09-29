import { useEffect, useState } from "react";
import { AiAreaTextWrapper } from "../styles/recipe_ai_styles";
import http from "../../../utils/http-commons";
import { getToken } from "../../../utils/JWT-token";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import AiVoiceTimer from "./ai_voice_timer";
import AiVoiceResult from "./ai_voice_result";

const AiVoiceListenArea = () => {
  const [alertAudio] = useState(new Audio("/sound/alert.wav"));
  const [talk, setTalk] = useState("듣는 중입니다...");
  const [recTrigger, setRecTrigger] = useState(false);
  const [alertPlay, setAlertPlay] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [recordState, setRecordState] = useState(null);
  const [audioFile, setAudioFile] = useState(undefined);

  useEffect(() => {
    setAlertPlay((prev) => {
      return !prev;
    });
  }, []);

  useEffect(() => {
    if (alertPlay) {
      alertAudio.load();
      alertAudio.play();
      setRecTrigger((prev) => {
        return !prev;
      });
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
  const onStop = (audioData) => {
    console.log("audioData", audioData);
    setAudioFile(audioData);
  };
  return (
    <>
      <AudioReactRecorder
        state={recordState}
        onStop={onStop}
        canvasWidth="0"
        canvasHeight="0"
      ></AudioReactRecorder>
      {disabled ? <AiAreaTextWrapper>{talk}</AiAreaTextWrapper> : null}
      {audioFile !== undefined && <AiVoiceResult audioFile={audioFile} />}
      <div>{recTrigger && <AiVoiceTimer recordeStop={recordeStop} />}</div>
    </>
  );
};

export default AiVoiceListenArea;
