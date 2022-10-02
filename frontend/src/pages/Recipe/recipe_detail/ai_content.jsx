import { Box, Button, Card } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Palette } from "../../../common/styles/palette";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
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
  const dispatch = useDispatch();
  useEffect(() => {
    if (content !== "" && currentCur < contentsLength) {
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
    <Box
      sx={{
        witdh: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Card
        sx={{
          witdh: "100%",
          height: "80%",
          mb: "5%",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          padding: "5%",
        }}
      >
        <h2>{content}</h2>
      </Card>
      <Box
        sx={{
          witdh: "100%",
          height: "10%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Card
          sx={{
            height: "100%",
            width: "75%",
            display: "flex",
            position: "relative",
            backgroundColor: `${Palette.mainColor3}`,
          }}
        >
          {currentCur > 0 && (
            <Button
              sx={{ position: "absolute", height: "100%", color: "black" }}
              variant="text"
              onClick={prePlayHandler}
              disableElevation
            >
              <FastRewindIcon />
            </Button>
          )}
          {nowPlaying ? (
            <Button
              sx={{
                position: "absolute",
                left: "50%",
                height: "100%",
                transform: "translateX(-50%)",
                color: "black",
              }}
              variant="text"
              onClick={pauseHandler}
              disableElevation
            >
              <PauseIcon />
            </Button>
          ) : (
            <Button
              sx={{
                position: "absolute",
                left: "50%",
                height: "100%",
                transform: "translateX(-50%)",
                color: "black",
              }}
              variant="text"
              onClick={playHandler}
              disableElevation
            >
              <PlayArrowIcon />
            </Button>
          )}
          {currentCur < contentsLength - 1 && (
            <Button
              sx={{
                position: "absolute",
                right: 0,
                height: "100%",
                color: "black",
              }}
              disableElevation
              variant="text"
              onClick={nextPlayHandler}
            >
              <FastForwardIcon />
            </Button>
          )}
        </Card>
        <Card
          sx={{
            witdh: "20%",
            height: "100%",
            ml: "auto",
            backgroundColor: `${Palette.mainColor3}`,
            display: "flex",
          }}
        >
          <Button
            sx={{ width: "100%", height: "100%", color: "black" }}
            variant="text"
            onClick={openAiHandler}
          >
            <KeyboardVoiceIcon />
          </Button>
        </Card>
      </Box>
    </Box>
  );
};

export default AiContent;
