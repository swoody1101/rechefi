import { useEffect, useRef, useState } from "react";

const AiVoiceTimer = ({ recordeStop }) => {
  const [sec, setSec] = useState(3);
  const initailTime = useRef(3);
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
      recordeStop();
    }
  }, [sec]);
  console.log(sec);
  return <div></div>;
};

export default AiVoiceTimer;
