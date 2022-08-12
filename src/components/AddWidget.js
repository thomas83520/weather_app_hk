import React from "react";
import { Box, Modal, Typography } from "@mui/material";

export default function AddWidget({
  handleClose,
  open,
  style,
  widgetsAvailable,
  addWidget,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Click to add widget to the dashboard
        </Typography>
        <Box id="modal-modal-description">
          {widgetsAvailable.items.map((item, index) => {
            //console.log(item);
            return (
              <Box
                key={index}
                m={1}
                height={20}
                width={20}
                onClick={() => addWidget(index)}
                sx={{
                  border: item.added ? "1px solid red" : "1px solid green",
                }}
              >
                {item.widget}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Modal>
  );
}
