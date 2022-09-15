import styled from "@emotion/styled";
import { Palette } from "../../../../common/styles/palette";

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
`;
