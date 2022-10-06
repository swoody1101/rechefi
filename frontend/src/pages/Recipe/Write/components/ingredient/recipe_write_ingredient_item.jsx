import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import RecipeWriteIngredInput from "./recipe_write_ingredient_input";

function RecipeWriteIngredItem({ index, onBlur, onDelete }) {
  const [ingredName, setIngredName] = useState("");
  const [ingredAmount, setIngredAmount] = useState("");

  // send name and amount to ingredient list
  const onInput = () => {
    onBlur({ name: ingredName, amount: ingredAmount }, index);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <RecipeWriteIngredInput
        label="이름"
        value={ingredName}
        setValue={setIngredName}
        onBlur={onInput}
        styles={{ flexGrow: 1 }}
      />
      <RecipeWriteIngredInput
        label={"양"}
        value={ingredAmount}
        setValue={setIngredAmount}
        onBlur={onInput}
        styles={{ maxWidth: "28%", ml: 1 }}
      />
      <IconButton sx={{ p: 0.5, ml: 0.5 }} onClick={() => onDelete(index)}>
        <RemoveCircleOutlineIcon />
      </IconButton>
    </Box>
  );
}

export default RecipeWriteIngredItem;
