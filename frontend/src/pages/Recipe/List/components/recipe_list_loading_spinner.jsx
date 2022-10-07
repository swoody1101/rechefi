import React from "react";
import { Box, CircularProgress, Fade } from "@mui/material";

function RecipeListLoadingSpinner({ loading }) {
  return (
    <Fade in={loading}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress sx={{ color: "#363636" }} />
      </Box>
    </Fade>
  );
}

RecipeListLoadingSpinner.defaultProps = {
  loading: true,
};

export default RecipeListLoadingSpinner;
