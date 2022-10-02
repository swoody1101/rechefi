import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Palette } from "../../../common/styles/palette";

const moveSideBar = keyframes`
  0%{
    transform: translate(-50%,100%);
  }
  100%{
    transform:translate(-50%,-50%);
  }
`;
export const AiAreaWrapper = styled.div`
  width: 85%;
  height: 60vh;
  background-color: ${Palette.mainColor2};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 15;
  border-radius: 3px;
  padding: 5%;
  animation: ${moveSideBar} 0.3s ease;
  @media only screen and (min-width: 1025px) {
    width: 50%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 65%;
  }
`;

export const AiAreaContentWrapper = styled.div`
  position: absolute;
  width: 85%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
  font-size: xx-large;
  font-weight: bolder;
  text-align: center;
`;

export const AiAreaControllerWrapper = styled.div`
  width: 100%;
  position: absolute;
  border-radius: 14px;
  bottom: 0px;
  height: 5vh;
  left: 0px;
  background-color: ${Palette.mainColor5};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AiAreaContentButtonWrapper = styled.div``;
export const AiAreaControllButton = styled.button`
  border: none;
  background: none;
  margin-left: 5%;
  margin-right: 5%;
`;

export const AiAreaContentCloseButtonWrapper = styled.div`
  position: absolute;
  top: 2%;
  right: 3%;
`;

export const AiAreaListenWrapper = styled.div`
  background-color: ${Palette.mainColor2};
  padding: 5%;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 75%;
  min-height: 25vh;
  max-height: 25vh;
  border-radius: 8px;
  z-index: 35;
  animation: ${moveSideBar} 0.3s ease;
  transform: translate(-50%, -50%);
  @media only screen and (min-width: 1025px) {
    width: 40%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 55%;
  }
`;

export const AiAreaListenBackDrop = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 25;
`;

export const AiAreaListenButton = styled.button`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 10%;
  background: none;
  border: none;
  width: 100%;
  height: 5vh;
  border-radius: 14px;
`;

export const AiAreaTextWrapper = styled.div`
  width: 90%;
  height: 10vh;
  position: absolute;
  font-size: x-large;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bolder;
`;

export const OpenAiButton = styled.div`
  margin-right: 3%;
`;

export const AiRecipeTitleLine = styled.h2`
  width: 100%;
  text-align: center;
  padding-bottom: 5%;
`;
