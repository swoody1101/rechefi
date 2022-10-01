import { useEffect } from "react";
import { useState } from "react";
import AiVoiceResultTimer from "./ai_voice_result_timer";

const AiVoiceReciveDispose = ({
  play,
  pause,
  prePlay,
  nextPlay,
  closeAiHandler,
  data,
  onPlay,
  toggleAI,
}) => {
  const [alertAudio] = useState(new Audio("/sound/yes.wav"));
  const [playing, setPlaying] = useState(true);
  const [timerTrigger, setTimerTrigger] = useState(undefined);
  const [closeModal, setCloseModal] = useState(false);

  const startTimer = () => {
    setTimerTrigger((prev) => {
      return !prev;
    });
  };
  useEffect(() => {
    playing ? alertAudio.play() : alertAudio.pause();
  }, [playing]);
  useEffect(() => {
    alertAudio.addEventListener("ended", () => {
      setTimerTrigger(true);
      setPlaying(false);
    });
    return () => {
      alertAudio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  useEffect(() => {
    if (!playing && !timerTrigger) {
      if (data === `"이전단계"`) {
        prePlay();
      } else if (data === `"다음단계"`) {
        nextPlay();
      } else if (data === `"일시정지"`) {
        pause();
      } else if (data === `"계속읽어줘"`) {
        play();
      }
      // } else if (data === `"멈춰"`) {
      //   closeAiHandler();
      // } else if (data === `"중지"`) {
      //   closeAiHandler();
      // }
      setCloseModal(true);
    }
  }, [playing, timerTrigger]);

  useEffect(() => {
    if (closeModal) {
      if (data === `"멈춰"` || data === `"중지"`) {
        toggleAI();
      } else {
        closeAiHandler();
      }
    }
  }, [closeModal]);

  return (
    <div>
      <div>인식된 명령어</div>
      <div>{data}</div>
      {timerTrigger ? <AiVoiceResultTimer startTimer={startTimer} /> : null}
    </div>
  );
};

export default AiVoiceReciveDispose;
