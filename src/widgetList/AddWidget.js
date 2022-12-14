import React from "react";

import { Box, Modal, Typography, Grid } from "@mui/material";

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

export default function AddWidget({
  handleClose,
  open,
  widgetsAvailable,
  addWidget,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={style} maxHeight="70%" overflow="scroll">
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
            {widgetsAvailable.map((item, index) => {
              return (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                  <Box
                    sx={{
                      filter: item.added ? "grayscale(100%)" : "grayscale(0%)",
                    }}
                    onClick={item.added ? null : () => addWidget([index])}
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
