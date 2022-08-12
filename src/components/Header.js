import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function Header() {
  return (
    <Box display="flex" alignItems="center">
      <Box
        component="img"
        maxWidth="100%"
        height={30}
        alt="Honk Kong Flag"
        src="/assets/flag-HK.png"
        pr={2}
      />
      <Typography component="h1">Hong Kong Weather</Typography>
    </Box>
  );
}
