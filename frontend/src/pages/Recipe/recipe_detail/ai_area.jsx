import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AiAreaWrapper } from "../styles/recipe_ai_styles";
import VoiceRecogition from "../../../utils/voice-recognition";
import { useMemo } from "react";
import { useState } from "react";
import AiContentWrapper from "./ai_content_wrapper";
import { useSelector } from "react-redux";
import AiListenArea from "./ai_listen_area";

const AiArea = ({ content, toggleAI }) => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = useMemo(
    () => new SpeechRecognition(),
    [SpeechRecognition]
  );
  //   const synth = useMemo(() => window.speechSynthesis, []);
  const [synth] = useState(window.speechSynthesis);
  const aiNowListen = useSelector(
    (store) => store.aiReducer.aiListen.nowListen
  );
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

  return createPortal(
    <AiAreaWrapper>
      {aiNowListen && <AiListenArea />}
      <AiContentWrapper
        synth={synth}
        content={content}
        recognition={recognition}
      />
      <VoiceRecogition recognition={recognition} />
    </AiAreaWrapper>,
    document.getElementById("myCookDetail")
  );
};

export default AiArea;
