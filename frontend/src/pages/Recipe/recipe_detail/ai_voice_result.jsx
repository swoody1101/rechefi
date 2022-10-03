import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  aiReadingPushPreButton,
  aiReadingNowPlaying,
  aiReadingPushNextButton,
  aiListenEndAction,
} from "../../../store/module/AiReducer";

const AiVoiceResult = ({ data, synth, toggleAI, recognition }) => {
  const [aiResult] = useState(new Audio("/sound/yes.wav"));
  const [aiWrong] = useState(new Audio("/sound/DDing.wav"));
  const [playing, setPlaying] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (playing) {
      if (data.data === `"다음단계"`) {
        aiResult.play();
      } else if (data.data === `"이전단계"`) {
        aiResult.play();
      } else if (data.data === `"멈춰"`) {
        aiResult.play();
      } else if (data.data === `"중지"`) {
        aiResult.play();
      } else if (data.data === `"일시정지"`) {
        aiResult.play();
      } else if (data.data === `"계속읽어줘"`) {
        aiResult.play();
      } else if (data.data === `"잘못된 입력입니다."`) {
        aiWrong.play();
      }
    } else {
      if (data.data === `"다음단계"`) {
        aiResult.pause();
        dispatch(aiReadingPushNextButton());
        synth.cancel();
        recognition.start();
        dispatch(aiListenEndAction());
      } else if (data.data === `"이전단계"`) {
        aiResult.pause();
        dispatch(aiReadingPushPreButton());
        synth.cancel();
        recognition.start();
        dispatch(aiListenEndAction());
      } else if (data.data === `"멈춰"`) {
        recognition.start();
        aiResult.pause();
        dispatch(aiListenEndAction());
      } else if (data.data === `"중지"`) {
        aiResult.pause();
        synth.cancel();
        recognition.start();
        toggleAI();
      } else if (data.data === `"일시정지"`) {
        aiResult.pause();
        dispatch(aiReadingNowPlaying());
        recognition.start();
        dispatch(aiListenEndAction());
      } else if (data.data === `"계속읽어줘"`) {
        aiResult.pause();
        dispatch(aiReadingNowPlaying());
        dispatch(aiListenEndAction());
        recognition.start();
        synth.resume();
      } else if (data.data === `"잘못된 입력입니다."`) {
        aiWrong.pause();
        recognition.start();
        dispatch(aiListenEndAction());
      }
    }
  }, [playing]);

  useEffect(() => {
    aiResult.addEventListener("ended", () => {
      setPlaying(false);
    });
    aiWrong.addEventListener("ended", () => {
      setPlaying(false);
    });
    return () => {
      aiResult.removeEventListener("ended", () => {
        setPlaying(false);
      });
      aiWrong.removeEventListener("ended", () => {
        setPlaying(false);
      });
    };
  }, []);

  return <div>{playing && <h2>인식한 단어는 {data.data} 입니다!</h2>}</div>;
};

export default AiVoiceResult;
