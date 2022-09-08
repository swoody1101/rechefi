import styled from "@emotion/styled";
import { Palette } from "../../../common/styles/palette";

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
  background-color: ${Palette.mainColor5};
  text-align: center;
  margin: 3%;
  padding: 3%;
`;

export const RecipeDetailContentWrapper = styled(
  RecipeDetailIngredientsWrapper
)``;
