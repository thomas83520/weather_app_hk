import React from "react";
import { Box, Typography, Divider } from "@mui/material";

export default function WidgetWindow({ icon, title, children }) {
  return (
    <Box
      width="100%"
      sx={{ border: "1px solid darkGrey", borderRadius: "5px" }}
    >
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        px={1}
      >
        <Box display="flex" alignItems="center" py={1}>
          {icon}
          <Typography pl={1}>{title}</Typography>
        </Box>
      </Box>
      <Divider />
      {children}
    </Box>
  );
}
