import { Container, Grid } from "@mui/material";
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
      <Grid container>
        <Grid item xs={12}>
          <CurrentWeather />
          <WidgetWindow
            icon={<CalendarMonthIcon fontSize="small" />}
            title="9-day weather forecast"
          >
            <WeatherForecast />
          </WidgetWindow>
        </Grid>
        <Grid item xs={12}>
          <WidgetListContextProvider>
            <WidgetsList />
          </WidgetListContextProvider>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
