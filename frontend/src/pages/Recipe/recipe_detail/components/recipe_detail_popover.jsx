import { Popover } from "@mui/material";
import RecipeDetailHelp from "./recipe_detail_help";

function RecipeDetailPopover({ anchorEl, setAnchorEl, open }) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={() => {
        setAnchorEl(null);
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <RecipeDetailHelp />
    </Popover>
  );
}

export default RecipeDetailPopover;
