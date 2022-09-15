import React, { useState } from "react";

const VoiceRecogition = () => {
  const [text, setText] = useState("");
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = "ko-KR";
  recognition.continuous = true;
  recognition.maxAlternatives = 1;

  let speechToText = text;
  recognition.addEventListener("result", (e) => {
    let interimTranscript = "";
    for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
      let transcript = e.results[i][0].transcript;
      console.log(transcript);
      if (e.results[i].isFinal) {
        speechToText += transcript;
      } else {
        interimTranscript += transcript;
      }
    }
    setText(speechToText + interimTranscript);
  });

  const testButton = () => {
    recognition.start();
  };
};
// export default VoiceRecogition;
