import {
  IconButton,
  ListItem,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Palette } from "../../../../../../common/styles/palette";

function RecipeFilterIngredItem({ ingredId, ingredName, onInclude, onDelete }) {
  // for filter options
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
            {/* <ToggleButton
              value={true}
              aria-label="include"
              sx={{
                borderRadius: "50%",
                background: Palette.gray1,
                border: 0,
                "&.Mui-selected, &.Mui-selected:hover": {
                  background: Palette.mainColor3,
                },
                "&.MuiToggleButton-root": {
                  color: "black",
                },
              }}
            >
              {isIncluded ? "포함" : "제외"}
            </ToggleButton> */}
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
