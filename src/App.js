import { useEffect } from "react";

import { Container, Grid, Box } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import WidgetsList from "./widgetList/WidgetsList";
import CurrentWeather from "./mainWeatherInfo/CurrentWeather";
import Header from "./components/Header";
import WeatherForecast from "./mainWeatherInfo/WeatherForecast";
import WidgetWindow from "./components/WidgetWindow";

import { WidgetListContextProvider } from "./context/widgetListContext";

function App() {
  useEffect(() => {
    document.title = "Weather in Hong Kong";
  });
  return (
    <Container>
      <Header />
      <WidgetListContextProvider>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box mx={{ md: 1 }}>
              <CurrentWeather />
              <WidgetWindow
                icon={<CalendarMonthIcon fontSize="small" />}
                title="9-day weather forecast"
              >
                <WeatherForecast />
              </WidgetWindow>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              maxHeight="100vh"
              overflow={{ md: "scroll" }}
              sx={{
                "-ms-overflow-style": "none",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              <WidgetsList />
            </Box>
          </Grid>
        </Grid>
      </WidgetListContextProvider>
    </Container>
  );
}

export default App;
