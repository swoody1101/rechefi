import React from "react";
import { Container } from "@mui/material";
import { Palette } from "../../../../../common/styles/palette";

function FreeBoardDetailCommentContainer({ children }) {
  return (
    <Container
      sx={{
        mt: 2,
        py: 1,
        px: 2,
        borderRadius: 1,
        background: Palette.mainColor2,
        width: "100%",
      }}
    >
      {children}
    </Container>
  );
}

export default FreeBoardDetailCommentContainer;
