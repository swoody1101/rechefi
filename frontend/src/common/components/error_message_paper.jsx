import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Palette } from "../styles/palette";

function ErrorMessagePaper({ message, error_message }) {
  return (
    <Paper
      sx={{
        display: "flex",
        width: "100%",
        p: 1,
        px: 1.5,
        alignItems: "center",
      }}
    >
      <ErrorIcon fontSize="large" color="warning" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 1,
          ml: 1,
        }}
      >
        {error_message ? (
          <Typography
            variant="h6"
            fontWeight={"bold"}
            align="center"
            color={Palette.black3}
          >
            {error_message}
          </Typography>
        ) : (
          ""
        )}
        <Typography
          fontSize={"0.8rem"}
          align="center"
          color={Palette.black2}
        >
          {message}
        </Typography>
      </Box>
    </Paper>
  );
}

ErrorMessagePaper.defaultProps = {
  message: "문제가 발생하였습니다",
};

export default ErrorMessagePaper;
