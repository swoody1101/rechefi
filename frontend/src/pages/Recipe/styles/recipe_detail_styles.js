import styled from "@emotion/styled";
import { Palette } from "../../../common/styles/palette";

export const RecipteDetailWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

//제목 포함 모든 내용 감싸는
export const RecipeDetailAllContentWrapper = styled.div`
  width: 100%;

  @media only screen and (min-width: 1025px) {
    width: 50%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 75%;
  }
`;

export const RecipeTitleAreaWrapperDiv = styled.div`
  border-bottom: 2px solid;
  margin-top: 5%;
  width: 95%;
`;

export const RecipeTitleTitleAreaDiv = styled.div`
  font-size: x-large;
  font-weight: bolder;
  text-align: center;
`;
export const RecipeWriterDateAreaDiv = styled.div`
  display: flex;
  margin-top: 3%;
  margin-bottom: 3%;
`;
export const RecipeWriterAreaDiv = styled.div`
  font-size: small;
`;
export const RecipeDateAreaDiv = styled.div`
  font-size: smaller;
  margin-left: auto;
`;

export const RecipeDetailTitleWrapperDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const RecipeDetailIngredientsWrapper = styled.div`
  border-radius: 14px;
  background-color: ${Palette.mainColor2};
  width: 95%;

  min-height: 15vh;
`;

export const RecipeDetailIngredientsElementWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding-bottom: 10%;
`;

export const RecipeDetailIngredinetsContentDiv = styled.div`
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RecipeDetailIngredientsText = styled.div`
  font-size: large;
  font-weight: bolder;
  padding: 3%;
`;

export const RecipeDetailIngredientElementDiv = styled.div`
  border-radius: 14px;
  background-color: ${Palette.mainColor3};
  text-align: center;
  margin: 3%;
  padding: 3%;
`;

export const RecipeDetailContentWrapper = styled(
  RecipeDetailIngredientsWrapper
)`
  display: flex;
  flex-direction: columns;
  justify-content: center;
  align-items: center;
`;

export const RecipeDetailContentElementDiv = styled(
  RecipeDetailIngredientElementDiv
)`
  width: 94%;
  padding: 5%;
  font-weight: bolder;
`;

export const RecipeDetailContentImage = styled.img`
  width: 100%;
  height: auto;
`;

export const RecipeDetailLikeWrppaerDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10%;
  flex-direction: column;
  width: 100%;
  text-align: center;
  align-items: center;
`;

export const RecipeDetailLikeBorderDiv = styled.div`
  display: flex;
  border-radius: 14px;
  background-color: #d9d9d9;
  padding-left: 3%;
  padding-right: 3%;
  padding-top: 2%;
  padding-bottom: 2%;
  width: 25%;
  margin-bottom: 5%;
  margin-top: 2%;
`;

export const RecipeDetailLikeCount = styled.div`
  font-size: large;
  font-weight: bolder;
  text-align: center;
  margin-left: auto;
`;

export const RecipeDetailAIButtonWrapper = styled.div`
  width: 100%;
  height: 5vh;
  display: flex;
  margin-top: 5%;
`;

export const RecipeDetailAIButton = styled.button`
  margin-left: auto;
  margin-right: 5%;
  width: 45%;
  height: 100%;
  background-color: ${Palette.mainColor3};
  border: none;
  border-radius: 14px;
  font-size: medium;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  :active {
    background-color: ${Palette.mainColor5};
  }
`;

export const RecipeDetailAIRemoteWrapper = styled.div`
  position: fixed;
  bottom: 1vh;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const RecipeDetailAIRemoteBox = styled.div`
  width: 85%;
  height: 5vh;
  background-color: ${Palette.mainColor5};
  border-radius: 14px;
  box-shadow: 4px 4px 3px 1px rgba(0, 0, 255, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FastForwardBox = styled.div`
  margin-left: auto;
  margin-right: 5%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ReForwardBox = styled.div`
  margin-right: auto;
  margin-left: 5%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MyRecipeDetailDeleteButtonWrapper = styled.button`
  background: none;
  background-color: ${Palette.mainColor3};
  width: 15%;
  border-radius: 8px;
  height: 6vh;
  margin-left: 3%;
  border: none;
  margin-bottom: 5%;
`;