import {
  Box,
  IconButton,
  ListItem,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function RecipeFilterIngredItem({
  ingredId,
  ingredName,
  onInclude,
  onDelete,
}) {
  const [isIncluded, setIsIncluded] = useState(true);

  const handleIncluded = (e, flag) => {
    setIsIncluded(flag ? true : false); // for UI
    onInclude(ingredId, flag ? true : false); // send data to parent
  };

  return (
    <ListItem
      sx={{ pr: 14 }}
      secondaryAction={
        <>
          <ToggleButtonGroup
            value={isIncluded}
            exclusive
            onChange={handleIncluded}
            aria-label="ingred_included"
            sx={{ m: 1 }}
          >
            <ToggleButton
              value={true}
              aria-label="include"
              sx={{
                borderRadius: "50%",
                border: 0,
                "&.Mui-selected, &.Mui-selected:hover": {
                  // TODO : backgroundcolor setting
                },
                "&.MuiToggleButton-root": {
                  color: "black",
                },
              }}
            >
              {isIncluded ? "포함" : "제외"}
            </ToggleButton>
          </ToggleButtonGroup>
          <IconButton
            onClick={() => onDelete(ingredId)}
            edge="end"
            aria-label="delete"
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
        </>
      }
    >
      <ListItemText primary={ingredName} />
    </ListItem>
  );
}

export default RecipeFilterIngredItem;
