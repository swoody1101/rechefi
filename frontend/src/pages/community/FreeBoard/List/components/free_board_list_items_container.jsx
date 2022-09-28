import { Container } from "@mui/material";
import React from "react";
import { Palette } from "../../../../../common/styles/palette";

function FreeBoardListItemContainer({
  children,
  style,
  isNotice,
}) {
  return (
    <Container
      sx={{
        background: isNotice
          ? Palette.mainColor1
          : Palette.white2,
        borderRadius: 1,
        ...style,
        py: 1,
        px: 1.2,
      }}
    >
      {children}
    </Container>
  );
}

export default FreeBoardListItemContainer;
