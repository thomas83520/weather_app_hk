import React from "react";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddWidget from "./AddWidget";
import DemoWidget from "./components/DemoWidget";
import WidgetListSnackBar from "./components/WidgetListSnackBar";
import { useWidgetListContext } from "../hooks/useWidgetListContext";
import TempWidget from "./components/TempWidget";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const initialWidgetsAvailable = [
  {
    demoWidget: (
      <DemoWidget demoImage="/assets/barChart.png" name="Temperature range" />
    ),
    added: false,
    widget: <TempWidget key="tempGraph"/>,
  },
  {
    demoWidget: (
      <DemoWidget demoImage="/assets/pieGraph.png" name="Lighting count" />
    ),
    added: false,
    widget: <Box key="lightningCount">f</Box>,
  },
  {
    demoWidget: <DemoWidget demoImage="/assets/areaChart.png" name="Tidal" />,
    added: false,
    widget: <Box key="tidal">g</Box>,
  },
  {
    demoWidget: (
      <DemoWidget
        demoImage="/assets/radarGraph.png"
        name="Visibility last 10minutes"
      />
    ),
    added: false,
    widget: <Box key="visibility">h</Box>,
  },
];
export default function WidgetsList() {
  const [openModal, setOpenModal] = useState(false);
  const { widgets, dispatch } = useWidgetListContext();
  const [widgetsAvailable, setWidgetsAvailable] = useState({
    items: initialWidgetsAvailable,
  });
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [success, setSuccess] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  useEffect(() => {
    const getAttachWidget = async () => {
      //TODO : get attach widget
    };
  }, []);

  const addWidget = (id) => {
    let newAvailableWidgetList = [...widgetsAvailable.items];
    newAvailableWidgetList.splice(id, 1, {
      ...widgetsAvailable.items[id],
      added: true,
    });
    dispatch({
      type: "ADD_WIDGET",
      payload: [...widgets, widgetsAvailable.items[id].widget],
    });
    setWidgetsAvailable((prevState) => {
      return { ...prevState, items: newAvailableWidgetList };
    });
    setSnackbarMessage("Widget added to your dashboard");
    setSuccess(true);
    setOpenSnackBar(true);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleCloseSnackBar = () => setOpenSnackBar(false);

  return (
    <>
      <TempWidget />
      {widgets.map((item) => {
        return item;
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
          style={style}
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
    </>
  );
}
