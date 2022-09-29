import { createPortal } from "react-dom";
import {
  AiAreaListenBackDrop,
  AiAreaListenButton,
  AiAreaListenWrapper,
} from "../styles/recipe_ai_styles";
import AiVoiceListenArea from "./ai_voice_listen_area";

const RecipeDeatilAIvoiceControll = ({ closeAiHandler }) => {
  return createPortal(
    <div>
      <AiAreaListenWrapper>
        <AiVoiceListenArea />
        <AiAreaListenButton onClick={closeAiHandler}>닫기</AiAreaListenButton>
      </AiAreaListenWrapper>
      <AiAreaListenBackDrop onClick={closeAiHandler} />
    </div>,
    document.getElementById("aiControll")
  );
};

export default RecipeDeatilAIvoiceControll;
