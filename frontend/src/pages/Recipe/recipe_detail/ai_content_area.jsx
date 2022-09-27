import { useEffect, useState } from "react";
import {
  AiAreaContentCloseButtonWrapper,
  AiAreaContentWrapper,
} from "../styles/recipe_ai_styles";
import AiVoiceController from "./ai_voice_controller";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery } from "@mui/material";

const AiContentArea = ({ content, toggleAI }) => {
  const [contentText, setContentText] = useState([]);
  const [currentCur, setCurrentCur] = useState(0);
  const [play, setPlay] = useState(true);
  const matches = useMediaQuery("(min-width:768px)");
  const synth = window.speechSynthesis;

  let flag = false;
  let rewind = false;

  useEffect(() => {
    console.log(synth.paused);

    synth.cancel();
    //   synth.resume();

    let text = ["음성 안내를 시작하겠습니다."];
    content.split("```").forEach((e) => {
      if (e.slice(0, 3) === "<p>") {
        const temp = e.slice(3, e.length - 4);
        text.push(temp);
      }
    });
    setContentText(text);
  }, [content]);

  useEffect(() => {
    if (
      contentText.length > 0 &&
      currentCur < contentText.length &&
      currentCur >= 0
    ) {
      const speechMsg = new SpeechSynthesisUtterance();
      speechMsg.rate = 1;
      speechMsg.pitch = 1;
      speechMsg.lang = "ko-KR";
      speechMsg.text = contentText[currentCur];
      speechMsg.onend = () => {
        setCurrentCur((prev) => {
          if (flag) {
            return prev - 1;
          } else {
            return prev + 1;
          }
        });
      };
      synth.speak(speechMsg);
    }
  }, [contentText, currentCur, flag, rewind, synth]);

  const prePlay = () => {
    flag = true;
    synth.cancel();
    setPlay((prev) => {
      return true;
    });
  };

  const nextPlay = () => {
    synth.cancel();
    setPlay((prev) => {
      return true;
    });
  };

  const pause = () => {
    synth.pause();
    setPlay((prev) => {
      return !prev;
    });
  };

  const resume = () => {
    synth.resume();
    setPlay((prev) => {
      return !prev;
    });
  };

  return (
    <div>
      <AiAreaContentCloseButtonWrapper>
        <CloseIcon
          sx={matches ? { fontSize: 40 } : { fontSize: 30 }}
          onClick={toggleAI}
        />
      </AiAreaContentCloseButtonWrapper>
      {currentCur >= 0 &&
      contentText.length > 1 &&
      currentCur < contentText.length ? (
        <AiAreaContentWrapper>
          {console.log(contentText[currentCur])}
          {contentText[currentCur]}
        </AiAreaContentWrapper>
      ) : (
        <AiAreaContentWrapper>
          음성 안내가 종료 되었습니다.
        </AiAreaContentWrapper>
      )}

      <AiVoiceController
        nextPlay={nextPlay}
        prePlay={prePlay}
        pause={pause}
        resume={resume}
        play={play}
      />
    </div>
  );
};

export default AiContentArea;
