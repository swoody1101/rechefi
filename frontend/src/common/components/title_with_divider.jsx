import {
  Box,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { Palette } from "../styles/palette";

function TitleWithDivider({
  textVariant,
  title,
  onClick,
  icon,
  marginBottom,
  Style,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mb: `${marginBottom}rem`,
        ...Style,
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography
          variant={textVariant}
          fontWeight={"bold"}
          color={Palette.black3}
          flexGrow={1}
        >
          {title}
        </Typography>

        {onClick !== null ? (
          <IconButton
            onClick={onClick}
            type="button"
            sx={{ p: 0.5 }}
          >
            {icon}
          </IconButton>
        ) : null}
      </Box>
      <Divider />
    </Box>
  );
}

TitleWithDivider.defaultProps = {
  variant: "h6",
  title: "제목",
  onClick: null,
  icon: null,
  marginBottom: 1,
};

export default TitleWithDivider;
