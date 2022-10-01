import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  aiReadEndAction,
  aiReadingPushPreButton,
  aiReadingNowPlaying,
  aiReadingPushNextButton,
  aiListenStartAction,
} from "../../../store/module/AiReducer";

const AiContent = ({ synth, recognition }) => {
  const content = useSelector((store) => store.aiReducer.aiReading.content);
  const currentCur = useSelector(
    (store) => store.aiReducer.aiReading.currentCur
  );
  const contentsLength = useSelector(
    (store) => store.aiReducer.aiReading.contents.length
  );
  const nowPlaying = useSelector(
    (store) => store.aiReducer.aiReading.nowPlaying
  );
  console.log(nowPlaying);
  const dispatch = useDispatch();
  console.log(content);
  useEffect(() => {
    if (content !== "") {
      const speechMsg = new SpeechSynthesisUtterance();
      speechMsg.rate = 1;
      speechMsg.pitch = 1;
      speechMsg.lang = "ko-KR";
      speechMsg.text = content;
      speechMsg.onend = () => {
        dispatch(aiReadEndAction());
      };
      synth.speak(speechMsg);
    }
  }, [content, dispatch, synth]);

  const prePlayHandler = async () => {
    await dispatch(aiReadingPushPreButton());
    synth.cancel();
  };

  const nextPlayHandler = async () => {
    await dispatch(aiReadingPushNextButton());
    synth.cancel();
  };

  const pauseHandler = async () => {
    await dispatch(aiReadingNowPlaying());
    synth.pause();
  };
  const playHandler = async () => {
    await dispatch(aiReadingNowPlaying());
    synth.resume();
  };
  const openAiHandler = async () => {
    await dispatch(aiReadingNowPlaying());
    synth.pause();
    recognition.stop();
    dispatch(aiListenStartAction());
  };
  return (
    <div>
      <div>{content}</div>
      <div>
        {currentCur > 0 && <button onClick={prePlayHandler}>이전</button>}
        {nowPlaying ? (
          <button onClick={pauseHandler}>일시 정지</button>
        ) : (
          <button onClick={playHandler}>재생</button>
        )}
        {currentCur < contentsLength - 1 && (
          <button onClick={nextPlayHandler}>다음</button>
        )}
      </div>
      <div>
        <button onClick={openAiHandler}>인공지능 열기</button>
      </div>
    </div>
  );
};

export default AiContent;
