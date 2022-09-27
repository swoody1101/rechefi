import styled from "@emotion/styled";
import { Palette } from "../../../common/styles/palette";

export const AiAreaWrapper = styled.div`
  width: 85%;
  height: 85vh;
  background-color: ${Palette.white3};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
  z-index: 15;
  border-radius: 14px;
  padding: 5px;
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
