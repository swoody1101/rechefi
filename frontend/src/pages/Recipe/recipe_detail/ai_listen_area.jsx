import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiAreaListenBackDrop,
  AiAreaListenButton,
  AiAreaListenWrapper,
} from "../styles/recipe_ai_styles";
import {
  aiListenEndAction,
  aiReqeustCacheClean,
} from "../../../store/module/AiReducer";
import AiListen from "./ai_listen";
import { useEffect } from "react";

const AiListenArea = () => {
  const aiListen = useSelector((store) => store.aiReducer.aiListen.nowListen);
  const dispatch = useDispatch();
  const closeHandler = () => {
    dispatch(aiListenEndAction());
  };
  useEffect(() => {
    dispatch(aiReqeustCacheClean());
  }, []);
  return createPortal(
    <div>
      <AiAreaListenWrapper>
        <>
          <AiListen />
        </>
        <AiAreaListenButton onClick={closeHandler}>닫기</AiAreaListenButton>
      </AiAreaListenWrapper>
      <AiAreaListenBackDrop />
    </div>,
    document.getElementById("aiControll")
  );
};

export default AiListenArea;
