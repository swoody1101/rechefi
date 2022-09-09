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
export const RecipeDetailCommentWraper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 5%;
  border-top: 1px solid;
`;

export const RecipeDetailCommentElementWraper = styled(
  RecipeDetailIngredientsWrapper
)`
  margin-top: 5%;
  margin-bottom: 5%;
  padding: 2%;
`;

export const RecipeDetailRecommentElementWrapper = styled(
  RecipeDetailIngredientsWrapper
)`
  width: 85%;
  margin-left: auto;
  margin-right: 2.5%;
  padding: 2%;
  margin-bottom: 3%;
  margin-top: 2%;
`;

export const RecipeDetailCommentElementBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const RecipeDetailCommentElementNameDiv = styled.div`
  font-size: large;
  font-weight: bolder;
`;

export const RecipeDetailCommentCreateWrapperDiv = styled.div`
  display: flex;
`;

export const RecipeDetailCommentCreateAtDiv = styled.div`
  font-size: small;
  margin-left: auto;
`;

export const RecipeDetailCommentContentBox = styled.div`
  font-weight: bold;
`;

export const RecipeDetailCommentContentInputWrapper = styled.div`
  border-radius: 14px;
  background-color: ${Palette.mainColor2};
  width: 95%;
  min-height: 8vh;
  padding: 3%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RecipeDetailCommentInput = styled.input`
  width: 75%;
  margin-right: auto;
  border-top: none;
  border-left: none;
  border-right: none;
  background: none;
  height: 4vh;
`;

export const RecipeDetailCommentButton = styled.button`
  border-radius: 14px;
  border: none;
  background-color: ${Palette.mainColor5};
  padding: 2%;
  text-align: center;
  font-weight: bolder;
  :active {
  }
  cursor: pointer;
`;
