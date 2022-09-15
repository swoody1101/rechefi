import React from "react";
import { Box, CircularProgress, Fade } from "@mui/material";

function RecipeListLoadingSpinner({ loading }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Fade in={loading}>
        <CircularProgress sx={{ color: "#363636" }} />
      </Fade>
    </Box>
  );
}

RecipeListLoadingSpinner.defaultProps = {
  loading: true,
};

export default RecipeListLoadingSpinner;
