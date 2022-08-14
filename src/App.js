import { Container, Grid, Box, Divider } from "@mui/material";
import CurrentWeather from "./mainWeatherInfo/CurrentWeather";
import Header from "./components/Header";
import WeatherForecast from "./mainWeatherInfo/WeatherForecast";
import WidgetWindow from "./components/WidgetWindow";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WidgetsList from "./widgetList/WidgetsList";
import { WidgetListContextProvider } from "./context/widgetListContext";




function App() {
  return (
    <Container>
      <Header />
      <WidgetListContextProvider>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box mx={{md:1}}>
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
            <Box maxHeight="100vh" overflow={{ md: "scroll" }}>
              <WidgetsList />
            </Box>
          </Grid>
        </Grid>
      </WidgetListContextProvider>
    </Container>
  );
}

export default App;
