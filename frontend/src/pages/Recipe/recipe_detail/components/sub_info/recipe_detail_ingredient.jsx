import { Box, Divider, Typography } from "@mui/material";
import { Palette } from "../../../../../common/styles/palette";
import RecipeDetailIngredientItem from "./recipe_detail_ingredient_item";

function RecipeDetailIngredient({ ingredients }) {
  return (
    <>
      <Typography
        fontSize={"1rem"}
        fontWeight="bold"
        sx={{ color: Palette.black2 }}
      >
        재료
      </Typography>
      <Divider />

      <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
        {ingredients.map((ingred, i) => (
          <RecipeDetailIngredientItem
            key={i}
            name={ingred.name}
            amount={ingred.amount}
          />
        ))}
      </Box>
    </>
  );
}

export default RecipeDetailIngredient;
