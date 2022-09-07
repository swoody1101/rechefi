const RecipeDetailIngredients = ({ ingredients }) => {
  return (
    <div>
      {Object.keys(ingredients).map((e, i) => (
        <div key={i}>{`${ingredients[e].name} ${ingredients[e].amount}`}</div>
      ))}
    </div>
  );
};

export default RecipeDetailIngredients;
