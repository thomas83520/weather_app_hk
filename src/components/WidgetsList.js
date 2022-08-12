import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddWidget from "./AddWidget";

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
  { widget: <Box height={20} width={20}></Box>, added: false },
  { widget: <Box height={20} width={20}></Box>, added: false },
  { widget: <Box height={20} width={20}></Box>, added: false },
  { widget: <Box height={20} width={20}></Box>, added: false },
];
export default function WidgetsList() {
  const [open, setOpen] = useState(false);
  const [widgets, setWidgets] = useState({ items: [] });
  const [widgetsAvailable, setWidgetsAvailable] = useState({
    items: initialWidgetsAvailable,
  });

  useEffect(() => {
    
    const getAttachWidget = async () => {
      //TODO : get attach widget
    };
  }, []);

  const addWidget = (id) => {
    let newAvailableWidgetList = [...widgetsAvailable.items];
    newAvailableWidgetList.splice(id, 1, {
      widget: <Box height={20} width={20}></Box>,
      added: true,
    });
    let newWidgets = [...widgets.items];
    newWidgets.push(widgetsAvailable.items[id].widget);
    setWidgets((prevState) => {
      return { ...prevState, items: newWidgets };
    });
    setWidgetsAvailable((prevState) => {
      return { ...prevState, items: newAvailableWidgetList };
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {widgets.items.map((item) => {
        return item;
      })}
      <Box my={2}>
        <Button
          fullWidth
          variant="outlined"
          size="large"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Ajouter un widget
        </Button>
        <AddWidget
          open={open}
          handleClose={handleClose}
          style={style}
          widgetsAvailable={widgetsAvailable}
          addWidget={addWidget}
        />
      </Box>
    </>
  );
}
