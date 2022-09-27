import { Paper } from "@mui/material";
import React from "react";

function FreeBoardWriteEditorContainer({ children }) {
  return (
    <Paper
      sx={{
        p: 2,
        mt: 2,
        mx: 1,
        mb: 1,
      }}
    >
      {children}
    </Paper>
  );
}

export default FreeBoardWriteEditorContainer;
