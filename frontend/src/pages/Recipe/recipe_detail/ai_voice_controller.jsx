import {
  AiAreaControllButton,
  AiAreaControllerWrapper,
  AiAreaListenBackDrop,
  AiAreaListenWrapper,
} from "../styles/recipe_ai_styles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import PauseIcon from "@mui/icons-material/Pause";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import RecipeDeatilAIvoiceControll from "./AIvoice_controll";

const AiVoiceController = ({
  prePlay,
  nextPlay,
  pause,
  resume,
  play,
  recognition,
  openAi,
  setOpenAi,
}) => {
  // const [openAi, setOpenAi] = useState(false);
  const matches = useMediaQuery("(min-width:768px)");
  const playButtonHandler = () => {
    if (play) {
      pause();
    } else {
      resume();
    }
  };
  const openAiHandler = () => {
    recognition.stop();
    pause();
    setOpenAi((prev) => {
      return !prev;
    });
  };
  const closeAiHandler = () => {
    recognition.start();
    resume();
    setOpenAi((prev) => {
      return !prev;
    });
  };
  return (
    <AiAreaControllerWrapper>
      {openAi ? (
        <RecipeDeatilAIvoiceControll closeAiHandler={closeAiHandler} />
      ) : null}
      <AiAreaControllButton onClick={prePlay}>
        <FastRewindIcon sx={matches ? { fontSize: 40 } : { fontSize: 30 }} />
      </AiAreaControllButton>
      {play ? (
        <AiAreaControllButton onClick={playButtonHandler}>
          <PauseIcon sx={matches ? { fontSize: 40 } : { fontSize: 30 }} />
        </AiAreaControllButton>
      ) : (
        <AiAreaControllButton onClick={playButtonHandler}>
          <PlayArrowIcon sx={matches ? { fontSize: 40 } : { fontSize: 30 }} />
        </AiAreaControllButton>
      )}

      <AiAreaControllButton onClick={nextPlay}>
        <FastForwardIcon sx={matches ? { fontSize: 40 } : { fontSize: 30 }} />
      </AiAreaControllButton>
      <button onClick={openAiHandler}>열기</button>
    </AiAreaControllerWrapper>
  );
};

export default AiVoiceController;