import React, { useState, useEffect } from "react";

import WidgetListSnackBar from "../widgetList/components/WidgetListSnackBar";

import { Box, Typography, Divider, IconButton } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import { Delete } from "@mui/icons-material";

import { useWidgetListContext } from "../hooks/useWidgetListContext";
import { useTheme } from "@emotion/react";

export default function WidgetWindow({
  icon,
  title,
  children,
  isAttachable = false,
  id = null,
}) {
  const theme = useTheme();
  const { widgets, widgetsAvailable, dispatch } = useWidgetListContext();

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [success, setSuccess] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isAttach, setIsAttach] = useState(false);
  
  const handleCloseSnackBar = () => setOpenSnackBar(false);

  //Set isAttach to true if widget comes from local storage
  useEffect(() => {
    const attachedWidget = getAttachWidgetFromStorage();
    attachedWidget.forEach((item) =>
      item.id === id ? setIsAttach(true) : null
    );
  }, []);

  //Get widget attach to dashboard from local storage
  const getAttachWidgetFromStorage = () => {
    return JSON.parse(localStorage.getItem("attachWidgets"))
      ? JSON.parse(localStorage.getItem("attachWidgets"))
      : [];
  };

  //Attach widget to dashboard
  const handleAttachment = () => {
    if (!isAttach) {
      let newAttach = getAttachWidgetFromStorage();
      newAttach.push({ id: id });
      console.log(newAttach);
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

    setSuccess(true);
    setSnackbarMessage(
      `Widget ${isAttach ? "detach from" : "attach to"} your dashboard`
    );
    setOpenSnackBar(true);
    setIsAttach(!isAttach);
  };

  //Remove widget from dashboard and remove attachment if widget is attached
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
      sx={{
        border: `1px solid ${theme.palette.primary.light}`,
        borderRadius: "15px",
        boxShadow:
          "3px 3px 6px rgba(0,0,0,0.2),-2px -2px 4px rgba(255,255,255,0.3)",
      }}
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
                <LinkIcon color="info" />
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
