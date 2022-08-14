import { createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EA3444",
      light: "#F8B9BE",
      shadow: "rgba(234,52,68,0.1)",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: { root: { color: "#EA3444" } },
    },
    MuiTypography: { styleOverrides: { root: { color: "#212529" } } },
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderRadius: "30px",
          boxShadow:
            "3px 5px 8px rgba(0,0,0,0.4),-5px -5px 10px rgba(255,255,255,0.7)",
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </LocalizationProvider>
);
