import styled from "@emotion/styled";
import { Palette } from "../../../common/styles/palette";
import { RecipeDetailIngredientsWrapper } from "../../../pages/Recipe/styles/recipe_detail_styles";

export const CommentWraper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: ${(props) => (props.aiButton ? "7vh" : "2vh")};
`;

export const CommentElementWraper = styled(RecipeDetailIngredientsWrapper)`
  margin-top: 5%;
  margin-bottom: 5%;
  padding: 2%;
`;

export const RecommentElementWrapper = styled(RecipeDetailIngredientsWrapper)`
  width: 85%;
  margin-left: auto;
  margin-right: 2.5%;
  padding: 2%;
  margin-bottom: 3%;
  margin-top: 2%;
`;

export const CommentElementBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const CommentElementNameDiv = styled.div`
  font-size: large;
  font-weight: bolder;
`;

export const CommentCreateWrapperDiv = styled.div`
  display: flex;
`;

export const CommentCreateAtDiv = styled.div`
  font-size: small;
  margin-left: auto;
`;

export const CommentContentBox = styled.div`
  font-weight: bold;
`;

export const CommentContentInputWrapper = styled.div`
  border-radius: 14px;
  background-color: ${Palette.mainColor2};
  width: 95%;
  min-height: 8vh;
  padding: 3%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CommentInput = styled.input`
  width: 75%;
  margin-right: auto;
  border-top: none;
  border-left: none;
  border-right: none;
  background: none;
  height: 4vh;
`;

export const CommentButton = styled.button`
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
