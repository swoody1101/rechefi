import { useEffect, useState } from "react";
import { AiVoiceTimer } from "./ai_voice_timer";
import { AiVoiceRequest } from "./ai_voice_request";
import { Box, Card } from "@mui/material";
import Recorder from "recorder-js";

const AiListen = ({ synth, toggleAI, recognition }) => {
  const [alertAudio] = useState(new Audio("/sound/alert.wav"));
  const [audioContext] = useState(
    new (window.AudioContext || window.webkitAudioContext)({
      sampleRate: 16000,
    })
  );
  const [recorder, setRecorder] = useState(undefined);
  const [playing, setPlaying] = useState(true);
  const [recTrigger, setRecTrigger] = useState(false);
  const [alertPlay, setAlertPlay] = useState(false);
  const [audioFile, setAudioFile] = useState(undefined);
  let isRecording = false;

  useEffect(() => {
    if (audioContext) {
      setRecorder(new Recorder(audioContext, {}));
    }
  }, [audioContext]);

  useEffect(() => {
    if (audioContext && recorder) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => recorder.init(stream))
        .catch((err) => console.log("문제가 발생했습니다.: ", err));
    }
  }, [recorder]);

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
    if (recorder) {
      recorder.start().then(() => {
        isRecording = true;
      });
    } else {
      console.log("준비되지 않음...");
    }
  };

  const recordeStop = () => {
    if (recorder) {
      const blob = undefined;
      recorder.stop().then(({ blob, buffer }) => {
        setAudioFile(blob);
      });
    }
    setRecTrigger(false);
  };
  return (
    <Box sx={{ height: "100%" }}>
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
