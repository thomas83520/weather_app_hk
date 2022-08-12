import { Box, Typography } from "@mui/material";
import React from "react";

export default function DemoWidget({
  name,
  isAdded,
  demoImage,
  id,
}) {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      alignItems="center"
      textAlign="center"
      sx={{
        boxShadow: 2,
        borderRadius: "15px",
        "&:hover": {
          boxShadow: 8,
        },
      }}
    >
      <Box height="150px" width="100%">
        <Box
          component="img"
          width="100%"
          height="100%"
          src={demoImage}
          sx={{ objectFit: "contain", zIndex: "-1" }}
        />
      </Box>

      <Box width="100%">
        <Typography my={1} noWrap>
          {name}
        </Typography>
      </Box>
    </Box>
  );
}

/*<Box
component="img"
maxHeight="70%"
maxWidth="90%"
src={demoImage}
alt="Graph/Charts demo image"
/>*/
