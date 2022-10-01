import { useEffect, useRef, useState } from "react";

const AiVoiceResultTimer = ({ startTimer }) => {
  const [sec, setSec] = useState(1);
  const initailTime = useRef(1);
  const interval = useRef(null);
  useEffect(() => {
    interval.current = setInterval(() => {
      initailTime.current -= 1;
      setSec(initailTime.current);
    }, 1000);
    return () => clearInterval(interval.current);
  }, []);
  useEffect(() => {
    if (initailTime.current <= 0) {
      clearInterval(interval.current);
      startTimer();
    }
  }, [sec]);
  console.log(sec);
  return <div>{sec}</div>;
};

export default AiVoiceResultTimer;
