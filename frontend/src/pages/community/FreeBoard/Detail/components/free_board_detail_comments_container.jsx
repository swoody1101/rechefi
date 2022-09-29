import React from "react";
import { Container } from "@mui/material";
import { Palette } from "../../../../../common/styles/palette";

function FreeBoardDetailCommentContainer({ children }) {
  return (
    <Container
      sx={{
        mt: 2,
        borderRadius: 2,
        background: Palette.mainColor3,
      }}
    >
      {children}
    </Container>
  );
}

export default FreeBoardDetailCommentContainer;
