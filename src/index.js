import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <App />
  </LocalizationProvider>
);
