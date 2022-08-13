import DemoWidget from "./widgetList/components/DemoWidget";
import TempWidget from "./widgetList/components/TempWidget";
import { Box } from "@mui/material";

export const tempStation = [
  {
    name: "Hong Kong Interational Airport",
    code: "HKA",
  },
  {
    name: "Hong Kong Observatory",
    code: "HKO",
  },
  {
    name: "Happy Valley",
    code: "HPV",
  },
  {
    name: "Kowloon City",
    code: "KLT",
  },
  {
    name: "The Peak",
    code: "VP1",
  },
  ,
];

export const initialWidgetsAvailable = [
  {
    demoWidget: (
      <DemoWidget demoImage="/assets/barChart.png" name="Temperature range" />
    ),
    added: false,
    id: "tempChart",
    widget: <TempWidget key="tempChart" />,
  },
  {
    demoWidget: (
      <DemoWidget demoImage="/assets/pieGraph.png" name="Lighting count" />
    ),
    added: false,
    id: "lightningCountGraph",
    widget: <Box key="lightningCountGraph">f</Box>,
  },
  {
    demoWidget: <DemoWidget demoImage="/assets/areaChart.png" name="Tidal" />,
    added: false,
    id: "tidalChart",
    widget: <Box key="tidalChart">g</Box>,
  },
  {
    demoWidget: (
      <DemoWidget
        demoImage="/assets/radarGraph.png"
        name="Visibility last 10minutes"
      />
    ),
    added: false,
    id: "visibilityGraph",
    widget: <Box key="visibility">h</Box>,
  },
];
