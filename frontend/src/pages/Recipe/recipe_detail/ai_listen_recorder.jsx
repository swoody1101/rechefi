import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Recorder from "recorder-js";
import { requestAiThunk } from "../../../store/module/AiReducer";

const AiListenRecorder = () => {
  const [audioContext] = useState(
    new (window.AudioContext || window.webkitAudioContext)({
      sampleRate: 16000,
    })
  );
  const dispatch = useDispatch();
  const [recorder, setRecorder] = useState(undefined);
  let isRecording = false;
  let exblob = null;
  const [testWav, setTestWav] = useState(undefined);

  useEffect(() => {
    if (audioContext) {
      setRecorder(
        new Recorder(audioContext, {
        })
      );
    }
  }, [audioContext]);
  useEffect(() => {
    if (audioContext && recorder) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => recorder.init(stream))
        .catch((err) => console.log("문제가 발생했습니다.: ", err));
    }
  }, [recorder]);

  function startRecording() {
    if (recorder) {
      recorder.start().then(() => (isRecording = true));
    } else {
    }
  }

  function stopRecording() {
    if (recorder) {
      recorder.stop().then(({ blob, buffer }) => {
        exblob = blob;
        const sound = new File([blob], "soundBlob", {
          lastModified: new Date().getTime(),
          type: "audio/wav",
        });
        console.log(sound);
        dispatch(requestAiThunk(sound));
      });
    }
  }

  function download() {
    Recorder.download(exblob, "my-audio-file");
  }

  function exportWavTest() {
    console.log(exblob);
    console.log(recorder);
    recorder &&
      recorder.exportWAV((exblob) => {
        console.log(exblob);
        const url = URL.createObjectURL(exblob);
        const filename = new Date().toISOString();
        console.log(url);
      }, "audio/wav");
  }

  return (
    <div>
      <button onClick={startRecording}>녹음 시작</button>
      <button onClick={stopRecording}>녹음 끝</button>
      <button onClick={download}>다운로드</button>
      <button onClick={exportWavTest}>이거는 무엇인가요?</button>
    </div>
  );
};

export default AiListenRecorder;
