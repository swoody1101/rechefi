import { Paper } from "@mui/material";
import React from "react";

function FreeBoardWriteEditorContainer({
  children,
  style,
}) {
  return (
    <Paper
      sx={{
        p: 2,
        mx: 1,
        mb: 1,
        ...style,
      }}
    >
      {children}
    </Paper>
  );
}

export default FreeBoardWriteEditorContainer;
