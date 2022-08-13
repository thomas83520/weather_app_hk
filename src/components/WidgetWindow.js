import React, { useState, useEffect } from "react";

import WidgetListSnackBar from "../widgetList/components/WidgetListSnackBar";

import { Box, Typography, Divider, IconButton } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import { Delete } from "@mui/icons-material";

import { useWidgetListContext } from "../hooks/useWidgetListContext";

export default function WidgetWindow({
  icon,
  title,
  children,
  isAttachable = false,
  id = null,
}) {
  const { widgets, widgetsAvailable, dispatch } = useWidgetListContext();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [success, setSuccess] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isAttach, setIsAttach] = useState(false);

  useEffect(() => {
    const attachedWidget = getAttachWidgetFromStorage();
    attachedWidget.forEach((item) =>
      item.id === id ? setIsAttach(true) : null
    );
  }, []);

  const handleCloseSnackBar = () => setOpenSnackBar(false);

  const getAttachWidgetFromStorage = () => {
    return JSON.parse(localStorage.getItem("attachWidgets"))
      ? JSON.parse(localStorage.getItem("attachWidgets"))
      : [];
  };

  const handleAttachment = () => {
    if (!isAttach) {
      let newAttach = getAttachWidgetFromStorage();
      newAttach.push({ id: id });
      window.localStorage.setItem("attachWidgets", JSON.stringify(newAttach));
    } else {
      window.localStorage.setItem(
        "attachWidgets",
        JSON.stringify(
          JSON.parse(localStorage.getItem("attachWidgets")).filter(
            (item) => item.id !== id
          )
        )
      );
    }

    setIsAttach(!isAttach);
  };
  const handleRemove = () => {
    if (isAttach) handleAttachment();
    const newAvailableWidget = [];
    widgetsAvailable.forEach((item) => {
      if (item.id === id) newAvailableWidget.push({ ...item, added: false });
      else newAvailableWidget.push({ ...item });
    });
    dispatch({
      type: "DELETE_WIDGET",
      payload: {
        widgets: widgets.filter((widget) => widget.id !== id),
        widgetsAvailable: newAvailableWidget,
      },
    });
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
            <IconButton
              aria-label="attach to dashboard"
              onClick={handleAttachment}
            >
              {isAttach ? (
                <LinkOffIcon color="error" />
              ) : (
                <LinkIcon color="primary" />
              )}
            </IconButton>
            <IconButton aria-label="attach to dashboard" onClick={handleRemove}>
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
