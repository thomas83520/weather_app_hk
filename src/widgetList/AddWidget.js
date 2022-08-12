import React from "react";
import { Box, Modal, Typography, Grid } from "@mui/material";

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
        <Typography
          id="modal-modal-title"
          variant="subtitle1"
          component="h2"
          my={1}
        >
          Click to add widget to the dashboard:
        </Typography>
        <Box id="modal-modal-description">
          <Grid container spacing={2}>
            {widgetsAvailable.items.map((item, index) => {
              //console.log(item);
              return (
                <Grid key={index} item xs={6}>
                  <Box
                    sx={{
                      filter: item.added
                        ? "grayscale(100%)"
                        : "grayscale(0%)",
                    }}
                    onClick={item.added ? null :() => addWidget(index)}
                  >
                    {item.demoWidget}
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
}
