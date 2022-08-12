import { Container, Grid } from "@mui/material";
import CurrentWeather from "./components/CurrentWeather";
import Header from "./components/Header";
import WeatherForecast from "./components/WeatherForecast";
import WidgetWindow from "./components/WidgetWindow";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WidgetsList from "./components/WidgetsList";

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
          <WidgetsList />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
