import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { Palette } from "../styles/palette";

function TitleWithDivider({ variant, title }) {
  return (
    <Box>
      <Typography
        variant={variant}
        fontWeight={"bold"}
        color={Palette.black3}
      >
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
    </Box>
  );
}

export default TitleWithDivider;
