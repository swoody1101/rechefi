import { React, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import VoiceRecogition from "../../../utils/voice-recognition";
import { AiAreaWrapper } from "../styles/recipe_ai_styles";
import AiContentArea from "./ai_content_area";

export default function AiArea({ content, toggleAI }) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = useMemo(
    () => new SpeechRecognition(),
    [SpeechRecognition]
  );
  const [openAi, setOpenAi] = useState(false);
  const [recStop, setRecStop] = useState(false);
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);
  const [voiceListen, setVoiceListen] = useState(false);
  const closeRecognition = () => {
    toggleAI();
    recognition.stop();
  };
  const voiceControllHandler = () => {
    setVoiceListen((prev) => {
      return !prev;
    });
  };
  const recStopHandler = (flag) => {
    setRecStop((prev) => {
      return flag;
    });
  };
  //   console.log(content);
  const openAiHandler = () => {
    setOpenAi((prev) => {
      return !prev;
    });
  };
  return createPortal(
    <AiAreaWrapper>
      <AiContentArea
        content={content}
        toggleAI={closeRecognition}
        voiceListen={voiceListen}
        voiceControllHandler={voiceControllHandler}
        recognition={recognition}
        recStop={recStop}
        recStopHandler={recStopHandler}
        openAi={openAi}
        setOpenAi={setOpenAi}
      />
      <VoiceRecogition
        recStop={recStop}
        voiceControllHandler={voiceControllHandler}
        recognition={recognition}
        recStopHandler={recStopHandler}
        openAiHandler={openAiHandler}
      />
    </AiAreaWrapper>,
    document.getElementById("myCookDetail")
  );
}
