import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { Palette } from "../../../../../common/styles/palette";

function FreeBoardWriteAdminCheckbox({
  label,
  checked,
  setchecked,
}) {
  return (
    <FormControlLabel
      label={label}
      sx={{ mx: 1 }}
      control={
        <Checkbox
          checked={checked}
          onChange={(e) => setchecked(e.target.checked)}
          sx={{
            color: Palette.mainColor2,
            "&.Mui-checked": {
              color: Palette.mainColor3,
            },
          }}
        />
      }
    />
  );
}

export default FreeBoardWriteAdminCheckbox;
