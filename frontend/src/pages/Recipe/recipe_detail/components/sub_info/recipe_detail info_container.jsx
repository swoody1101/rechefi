import { Box } from "@mui/material";
import { Palette } from "../../../../../common/styles/palette";
import RecipeDetailIngredient from "./recipe_detail_ingredient";
import RecipeDetailTags from "./recipe_detail_tags";

function RecipeDetailInfoContainer({ tags, ingredients }) {
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
      <RecipeDetailTags tags={tags}></RecipeDetailTags>
      <RecipeDetailIngredient ingredients={ingredients} />
    </Box>
  );
}

export default RecipeDetailInfoContainer;
