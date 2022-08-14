import React from "react";
import { Box } from "@mui/material";

export default function WeatherIcon({ icon, height = 70, width = 70, my = 1 }) {
  return (
    <Box
      component="img"
      width={width}
      height={height}
      src={require(`../../assets/weather-icons/pic${icon}.png`)}
      p={1}
      my={my}
      sx={{ backgroundColor: "#1B5397", borderRadius: "15px" }}
    />
  );
}
