import React, { useState } from "react";

import WidgetListSnackBar from "../widgetList/components/WidgetListSnackBar";

import { Box, Typography, Divider, IconButton } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import { Delete } from "@mui/icons-material";

export default function WidgetWindow({
  icon,
  title,
  children,
  isAttachable = false,
  isAttach = false,
  attach = () => null,
  remove = () => null,
}) {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [success, setSuccess] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackBar = () => setOpenSnackBar(false);

  const handleAttach = () => {
    attach();
    setSnackbarMessage(
      `Widget ${isAttach ? "detach from" : "attach to"} your dashboard. ${isAttach ? "" : "Reload the page won't remove it."}`
    );
    setSuccess(true);
    setOpenSnackBar(true);
  };
  return (
    <Box
      my={1}
      width="100%"
      sx={{ border: "1px solid darkGrey", borderRadius: "5px" }}
    >
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" alignItems="center" p={1}>
          {icon}
          <Typography pl={1}>{title}</Typography>
        </Box>
        {isAttachable && (
          <Box>
            <IconButton aria-label="attach to dashboard" onClick={handleAttach}>
              {isAttach ? (
                <LinkOffIcon color="error" />
              ) : (
                <LinkIcon color="primary" />
              )}
            </IconButton>
            <IconButton aria-label="attach to dashboard" onClick={remove}>
              <Delete fontSize="small" color="warning" />
            </IconButton>
          </Box>
        )}
      </Box>
      <Divider />
      {children}
      <WidgetListSnackBar
        success={success}
        open={openSnackBar}
        snackbarMessage={snackbarMessage}
        handleClose={handleCloseSnackBar}
      />
    </Box>
  );
}
