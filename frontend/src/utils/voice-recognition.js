import React, { useEffect, useMemo, useState } from "react";

const VoiceRecogition = ({
  voiceControllHandler,
  recognition,
  recStopHandler,
  recStop,
  openAiHandler,
}) => {
  const [text, setText] = useState("");
  const [detected, setDetected] = useState(false);

  recognition.interimResults = true;
  recognition.lang = "ko-KR";
  recognition.continuous = true;
  recognition.maxAlternatives = 1;
  const synth = window.speechSynthesis;
  recognition.addEventListener("result", (e) => {
    for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
      let transcript = e.results[i][0].transcript;
      console.log(transcript);
      if (e.results[i].isFinal && transcript.includes("메카")) {
        console.log("aaaaaaa");
        setDetected(true);
        recognition.stop();
      }
    }
  });
  useEffect(() => {
    if (detected && !synth.paused) {
      synth.pause();
      setDetected(false);
      openAiHandler();
    }
    voiceControllHandler();
  }, [detected]);
  useEffect(() => {
    recognition.start();
    console.log("시작");
  }, []);
  console.log(text);
};
export default VoiceRecogition;
