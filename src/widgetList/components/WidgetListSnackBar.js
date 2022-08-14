import React from "react";

import { Snackbar, Alert } from "@mui/material";

export default function WidgetListSnackBar({
  snackbarMessage,
  open,
  handleClose,
  success,
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      onClose={handleClose}
      key="Snackbar"
      autoHideDuration={2000}
    >
      {success ? (
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      ) : (
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      )}
    </Snackbar>
  );
}
