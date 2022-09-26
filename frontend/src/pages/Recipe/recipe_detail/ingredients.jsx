import {
  RecipeDetailIngredientElementDiv,
  RecipeDetailIngredientsElementWrapper,
  RecipeDetailIngredientsText,
  RecipeDetailIngredientsWrapper,
} from "../styles/recipe_detail_styles";

const RecipeDetailIngredients = ({ ingredients }) => {
  return (
    <RecipeDetailIngredientsWrapper>
      <RecipeDetailIngredientsText>재료</RecipeDetailIngredientsText>
      <RecipeDetailIngredientsElementWrapper>
        {Object.keys(ingredients).map((e, i) => (
          <RecipeDetailIngredientElementDiv
            key={i}
          >{`${ingredients[e].name} ${ingredients[e].amount}`}</RecipeDetailIngredientElementDiv>
        ))}
      </RecipeDetailIngredientsElementWrapper>
    </RecipeDetailIngredientsWrapper>
  );
};

export default RecipeDetailIngredients;
