import { Snackbar } from "@mui/material";
import React from "react";

function AlertSnackbar({ open, handleClose, message }) {
  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
      message={message}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      sx={{ m: 1 }}
    ></Snackbar>
  );
}

export default AlertSnackbar;
