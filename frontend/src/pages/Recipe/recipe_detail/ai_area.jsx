import { React, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AiAreaWrapper } from "../styles/recipe_ai_styles";
import AiContentArea from "./ai_content_area";
import AiVoiceController from "./ai_voice_controller";

export default function AiArea({ content, toggleAI }) {
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
  //   console.log(content);
  return createPortal(
    <AiAreaWrapper>
      <AiContentArea content={content} toggleAI={toggleAI} />
    </AiAreaWrapper>,
    document.getElementById("myCookDetail")
  );
}
