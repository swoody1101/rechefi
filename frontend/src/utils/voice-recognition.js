import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  aiReadingNowPlaying,
  aiListenStartAction,
} from "../store/module/AiReducer";

const VoiceRecogition = ({ recognition }) => {
  const dispatch = useDispatch();

  // recognition.interimResults = true;
  recognition.lang = "ko-KR";
  recognition.continuous = true;
  recognition.maxAlternatives = 1;
  const synth = window.speechSynthesis;
  recognition.addEventListener("result", async (e) => {
    for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
      let transcript = e.results[i][0].transcript;
      console.log(transcript);
      if (e.results[i].isFinal && transcript.includes("요리조리")) {
        recognition.stop();
        synth.pause();
        await dispatch(aiReadingNowPlaying());
        await dispatch(aiListenStartAction());
      }
    }
  });
  useEffect(() => {
    recognition.start();
    console.log("시작");
  }, []);
};
export default VoiceRecogition;
