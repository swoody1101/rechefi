import { Box, Typography } from "@mui/material";
import { Palette } from "../../../../common/styles/palette";

function RecipeDetailIngredientItem({ name, amount }) {
  return (
    <Box
      sx={{
        p: 1.2,
        m: 1,
        textAlign: "center",
        background: Palette.mainColor2,
        borderRadius: 4,
      }}
    >
      <Typography
        fontWeight={"bold"}
        fontSize={"0.8rem"}
        sx={{ color: Palette.black3 }}
      >{`${name} ${amount}`}</Typography>
    </Box>
  );
}

export default RecipeDetailIngredientItem;
