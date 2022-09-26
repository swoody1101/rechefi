import styled from "@emotion/styled";
import { Palette } from "../../../../../common/styles/palette";

export const WriteWrapper = styled.div`
  margin-top: 5%;
  width: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
`;

export const RecipeListModal = styled.div`
  z-index: 11;
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  width: 85%;
  height: 85vh;
  background-color: white;
  box-shadow: 4px 4px 3px 1px rgba(0, 0, 0, 0.3);
  border-radius: 14px;
  overflow-y: scroll;
`;

export const RecipeListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const RecipeListSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8vh;
  width: 100%;
`;

export const RecipeListSearchWithResultDiv = styled.div`
  border-radius: 14px;
  background-color: ${Palette.mainColor2};
  width: 90%;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RecipeListSearchResultButton = styled.button`
  padding: 2%;
  margin-top: 1vh;
  border: none;
  background-color: ${Palette.mainColor4};
  width: 90%;
  border-radius: 14px;
  font-size: large;
  font-weight: bold;
`;

export const TextAreaWrapper = styled.div`
  margin-top: 3vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 40vh;
`;

export const TextInputArea = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3%;
`;

export const WriteTextLidArea = styled.div`
  width: 100%;
  height: 4%;
  background-color: ${Palette.mainColor2};
  display: flex;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
`;

export const WriteTextInput = styled.textarea`
  width: 100%;
  padding-top: 3%;
  padding-bottom: 3%;
  height: 30vh;
  background-color: ${Palette.mainColor3};
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
  /* overflow-y: scroll; */
  border: none;
`;

export const WriteText = styled.div`
  font-size: large;
  font-weight: bold;
  margin-left: 3%;
`;

export const WriteButton = styled.button`
  background-color: ${Palette.mainColor4};
  border-radius: 14px;
  border: none;
  font-size: x-large;
  font-weight: bolder;
  width: 80%;
  height: 6vh;
`;
