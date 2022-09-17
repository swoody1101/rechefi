import { Box } from "@mui/material";
import React from "react";
import TitleWithDivider from "../../../../common/components/title_with_divider";
import RecipeWriteIngredInputItem from "./recipe_write_ingredient_item";
import AddBoxIcon from "@mui/icons-material/AddBox";

function RecipeWriteIngredList({
  ingredients,
  setIngredients,
}) {
  // handle input from one item
  const onInput = (inputed_ingred, inputed_idx) => {
    setIngredients(
      ingredients.map((ingred, index) =>
        index === inputed_idx ? inputed_ingred : ingred
      )
    );

    console.log(ingredients);
  };

  const onDelete = (deleted_idx) => {
    setIngredients(
      ingredients.filter(
        (ingred, index) => index !== deleted_idx
      )
    );
  };

  const recipeIngredInputs = ingredients.map(
    (ingred, index) => {
      return (
        <RecipeWriteIngredInputItem
          key={index}
          index={index}
          onBlur={onInput}
          onDelete={onDelete}
        />
      );
    }
  );

  // control ingred information
  const addIngred = () => {
    setIngredients([
      ...ingredients,
      { name: "", amount: "" },
    ]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        m: 1,
      }}
    >
      <TitleWithDivider
        variant="h6"
        title="준비물"
        onClick={addIngred}
        icon={<AddBoxIcon />}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: 1.5,
        }}
      >
        {recipeIngredInputs}
      </Box>
    </Box>
  );
}

export default RecipeWriteIngredList;
