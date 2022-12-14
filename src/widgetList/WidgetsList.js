import React from "react";
import { useEffect, useState, useRef } from "react";

import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import AddWidget from "./AddWidget";
import WidgetListSnackBar from "./components/WidgetListSnackBar";

import { useWidgetListContext } from "../hooks/useWidgetListContext";

export default function WidgetsList() {
  const { widgets, widgetsAvailable, dispatch } = useWidgetListContext();
  const widgetsListRef = useRef();

  const [openModal, setOpenModal] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [success, setSuccess] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [init, setInit] = useState(true);

  //Get attach widget from local storage and add them to widget list
  useEffect(() => {
    const getAttachWidget = async () => {
      const attachedWidgets = JSON.parse(localStorage.getItem("attachWidgets"))
        ? JSON.parse(localStorage.getItem("attachWidgets"))
        : [];
      let widgetToAdd = [];
      attachedWidgets.forEach((item, index) => {
        widgetsAvailable.forEach((availableItem, index) =>
          availableItem.id === item.id ? widgetToAdd.push(index) : null
        );
      });
      addWidget(widgetToAdd);
    };
    getAttachWidget();
    setInit(false);
  }, []);

  //Show snackbar on widget list change
  useEffect(() => {
    if (init) {
      widgetsListRef.current = widgets;
      return;
    }
    if (widgetsListRef.current) {
      if (widgetsListRef.current.length < widgets.length) {
        setSnackbarMessage("Widget added to your dashboard");
        setSuccess(true);
        setOpenSnackBar(true);
      }
      if (widgetsListRef.current.length > widgets.length) {
        setSnackbarMessage("Widget remove from your dashboard");
        setSuccess(true);
        setOpenSnackBar(true);
      }
    }
    widgetsListRef.current = widgets;
  }, [widgets]);

  //Add widget to widget list
  const addWidget = (ids) => {
    let newAvailableWidgetList = [...widgetsAvailable];
    let widgetToAdd = [];
    ids.forEach((id) => {
      newAvailableWidgetList.splice(id, 1, {
        ...widgetsAvailable[id],
        added: true,
      });
      widgetToAdd.push({
        widget: widgetsAvailable[id].widget,
        id: widgetsAvailable[id].id,
      });
    });
    dispatch({
      type: "ADD_WIDGET",
      payload: {
        widgets: [...widgets, ...widgetToAdd],
        widgetsAvailable: newAvailableWidgetList,
      },
    });
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleCloseSnackBar = () => setOpenSnackBar(false);

  return (
    <Box mx={{ md: 1 }}>
      {widgets.map((item) => {
        return item.widget;
      })}
      <Box my={2}>
        <Button
          fullWidth
          variant="outlined"
          size="large"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          Ajouter un widget
        </Button>
        <AddWidget
          open={openModal}
          handleClose={handleCloseModal}
          widgetsAvailable={widgetsAvailable}
          addWidget={addWidget}
        />
      </Box>
      <WidgetListSnackBar
        success={success}
        open={openSnackBar}
        snackbarMessage={snackbarMessage}
        handleClose={handleCloseSnackBar}
      />
    </Box>
  );
}
