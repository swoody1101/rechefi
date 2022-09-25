import { Container } from "@mui/material";
import React from "react";
import { Palette } from "../../../../../common/styles/palette";

function FreeBoardListItemContainer({ children, style }) {
  return (
    <Container
      sx={{
        // background: Palette.mainColor1,
        borderRadius: 3,
        ...style,
      }}
    >
      {children}
    </Container>
  );
}

export default FreeBoardListItemContainer;
