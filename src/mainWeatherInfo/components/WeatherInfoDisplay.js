import React from "react";

import { Box, Skeleton, Typography } from "@mui/material";

export default function WeatherInfoDisplay({ info, unit }) {
  return (
    <>
      {info ? (
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="end"
        >
          <Box>
            <Typography variant="body2">
              {unit === "%" ? "Humidity" : info.place}
            </Typography>
            <Typography variant="h5">
              {info.value}
              {unit}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box mx={2}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Box>
      )}
    </>
  );
}
