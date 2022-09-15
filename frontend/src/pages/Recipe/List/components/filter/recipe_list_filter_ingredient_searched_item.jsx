import {
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";

function RecipeFilterIngredSearchedItem({
  onClick,
  itemName,
}) {
  return (
    <ListItemButton onClick={onClick}>
      <ListItemText primary={itemName} />
    </ListItemButton>
  );
}

export default RecipeFilterIngredSearchedItem;
