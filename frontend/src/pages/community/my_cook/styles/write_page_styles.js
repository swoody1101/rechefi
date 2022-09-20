import styled from "@emotion/styled";
import { Palette } from "../../../../common/styles/palette";

export const WriteAreaWrapper = styled.div`
  margin-top: 3vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
`;

export const ImageUploadArea = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageUploadWrapper = styled.div`
  width: 100%;
  height: 4%;
  background-color: ${Palette.mainColor2};
  display: flex;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
`;

export const ImageUploadButton = styled.button`
  border: none;
  margin-left: auto;
  background: none;
  margin-right: 3%;
`;

export const ImageUploadText = styled.div`
  font-size: large;
  font-weight: bold;
  margin-left: 3%;
`;

export const ImageArea = styled.div`
  width: 100%;
  padding-top: 3%;
  padding-bottom: 3%;
  max-height: 90%;
  background-color: ${Palette.mainColor3};
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
  overflow-y: scroll;
`;

export const UploadImageImg = styled.img`
  width: 100%;
  height: auto;
`;
