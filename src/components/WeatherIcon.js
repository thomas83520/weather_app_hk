import React from "react";
import { Box, Skeleton } from "@mui/material";

export default function WeatherIcon({ icon, height=70,width=70,my=1 }) {
  return (
    <Box
      component="img"
      width={width}
      height={height}
      src={`/assets/weather-icons/pic${icon}.png`}
      p={1}
      my={my}
      sx={{ backgroundColor: "#1B5397", borderRadius: "15px" }}
    />
  );
}
