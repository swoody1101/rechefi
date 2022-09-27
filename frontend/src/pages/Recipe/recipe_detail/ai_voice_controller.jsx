import {
  AiAreaControllButton,
  AiAreaControllerWrapper,
} from "../styles/recipe_ai_styles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import PauseIcon from "@mui/icons-material/Pause";
import { useMediaQuery } from "@mui/material";

const AiVoiceController = ({ prePlay, nextPlay, pause, resume, play }) => {
  const matches = useMediaQuery("(min-width:768px)");
  const playButtonHandler = () => {
    if (play) {
      pause();
    } else {
      resume();
    }
  };
  return (
    <AiAreaControllerWrapper>
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
    </AiAreaControllerWrapper>
  );
};

export default AiVoiceController;
