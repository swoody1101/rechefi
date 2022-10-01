import { createPortal } from "react-dom";
import {
  AiAreaListenBackDrop,
  AiAreaListenButton,
  AiAreaListenWrapper,
} from "../styles/recipe_ai_styles";
import AiVoiceListenArea from "./ai_voice_listen_area";

const RecipeDeatilAIvoiceControll = ({
  closeAiHandler,
  play,
  pause,
  prePlay,
  nextPlay,
  onPlay,
  toggleAI,
}) => {
  return createPortal(
    <div>
      <AiAreaListenWrapper>
        <AiVoiceListenArea
          play={play}
          pause={pause}
          prePlay={prePlay}
          nextPlay={nextPlay}
          closeAiHandler={closeAiHandler}
          onPlay={onPlay}
          toggleAI={toggleAI}
        />
        <AiAreaListenButton onClick={closeAiHandler}>닫기</AiAreaListenButton>
      </AiAreaListenWrapper>
      <AiAreaListenBackDrop onClick={closeAiHandler} />
    </div>,
    document.getElementById("aiControll")
  );
};

export default RecipeDeatilAIvoiceControll;
