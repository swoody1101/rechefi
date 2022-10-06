import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiAreaListenBackDrop,
  AiAreaListenWrapper,
} from "../styles/recipe_ai_styles";
import {
  aiListenEndAction,
  aiReqeustCacheClean,
} from "../../../store/module/AiReducer";
import AiListen from "./ai_listen";
import { useEffect } from "react";
import { Box, Button } from "@mui/material";

const AiListenArea = ({ synth, toggleAI, recognition }) => {
  const aiListen = useSelector((store) => store.aiReducer.aiListen.nowListen);
  const dispatch = useDispatch();
  const closeHandler = () => {
    dispatch(aiListenEndAction());
    recognition.start();
  };
  useEffect(() => {
    dispatch(aiReqeustCacheClean());
  }, []);
  return createPortal(
    <div>
      <AiAreaListenWrapper>
        <Box sx={{ height: "100%" }}>
          <AiListen
            synth={synth}
            toggleAI={toggleAI}
            recognition={recognition}
          />
        </Box>
        <Button
          sx={{ position: "absolute", bottom: "3%", color: "black" }}
          onClick={closeHandler}
        >
          닫기
        </Button>
      </AiAreaListenWrapper>
      <AiAreaListenBackDrop />
    </div>,
    document.getElementById("aiControll")
  );
};

export default AiListenArea;
