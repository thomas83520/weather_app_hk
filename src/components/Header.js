import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function Header() {
  return (
    <Box display="flex" alignItems="center">
      <Box
        component="img"
        maxWidth="100%"
        height={40}
        alt="Honk Kong Flag"
        src="/assets/flag-HK.png"
        py={2}
      />
      <Typography pl={1} component="h1" color="primary" variant="h3">
        Hong Kong Weather
      </Typography>
    </Box>
  );
}
