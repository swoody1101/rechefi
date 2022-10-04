import { Box, Divider, Typography } from "@mui/material";
import { Palette } from "../../../../common/styles/palette";
import RecipeDetailIngredientItem from "./recipe_detail_ingredient_item";

function RecipeDetailIngredient({ ingredients }) {
  return (
    <Box
      sx={{
        width: "100%",
        background: Palette.mainColor1,
        borderRadius: 2,
        p: 2,
        my: 2,
      }}
    >
      <Typography
        fontSize={"1rem"}
        fontWeight="bold"
        sx={{ color: Palette.black2 }}
      >
        재료
      </Typography>
      <Divider />

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {ingredients.map((ingred, i) => (
          <RecipeDetailIngredientItem
            key={i}
            name={ingred.name}
            amount={ingred.amount}
          />
        ))}
      </Box>
    </Box>
  );
}

export default RecipeDetailIngredient;
