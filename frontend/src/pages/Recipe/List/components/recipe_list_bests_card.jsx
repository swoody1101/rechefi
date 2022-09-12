import { Box, Chip } from "@mui/material";
import React from "react";

function BestRecipeCard({ bestRecipe }) {
  return (
    <Box sx={{ position: "relative" }}>
      <Chip
        label={bestRecipe.title}
        sx={{
          position: "absolute",
          top: "5px",
          left: "5px",
          bottom: "auto",
          right: "auto",
          opacity: "0.8",
          bgcolor: "white",
        }}
      />
      <img
        style={{
          width: "100%",
          maxHeight: 160,
          objectFit: "cover",
          userDrag: "none",
          userSelect: "none",
        }}
        src={require("../../../../assets/img/food_example_2.jpg")}
        alt={bestRecipe.title}
      />
    </Box>
  );
}

export default BestRecipeCard;
