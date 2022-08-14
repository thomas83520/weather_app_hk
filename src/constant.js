import DemoWidget from "./widgetList/components/DemoWidget";
import TempWidget from "./widgetList/components/TempWidget";
import LigthningCountWidget from "./widgetList/components/LigthningCountWidget";
import TidalChartWidget from "./widgetList/components/TidalChartWidget";
import MeanVisibilityWidget from "./widgetList/components/MeanVisibilityWidget";

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
  
];

export const tidalStation = [
  {
    name: "Cheung Chau",
    code: "CCH",
  },
  {
    name: "Quarry Bay",
    code: "QUB",
  },
  {
    name: "Waglan Island",
    code: "WAG",
  },
  {
    name: "Chek Lap Kok",
    code: "CLK",
  },
];

export const initialWidgetsAvailable = [
  {
    demoWidget: (
      <DemoWidget demoImage={require("./assets/barChart.png")} name="Temperature range" />
    ),
    added: false,
    id: "tempChart",
    widget: <TempWidget key="tempChart" />,
  },
  {
    demoWidget: (
      <DemoWidget demoImage={require("./assets/pieGraph.png")} name="Lighting count" />
    ),
    added: false,
    id: "lightningCountGraph",
    widget: <LigthningCountWidget key="lightningCountGraph" />,
  },
  {
    demoWidget: <DemoWidget demoImage={require("./assets/areaChart.png")} name="Tides charts" />,
    added: false,
    id: "tidalChart",
    widget: <TidalChartWidget key="tidalChart" />,
  },
  {
    demoWidget: (
      <DemoWidget
        demoImage={require("./assets/radarGraph.png")}
        name="Visibility last 10minutes"
      />
    ),
    added: false,
    id: "meanVisibilityGraph",
    widget: <MeanVisibilityWidget key="meanVisibilityGraph" />,
  },
];
