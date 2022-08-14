import { Skeleton, Box, Typography, Grid, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";

import WeatherIcon from "./components/WeatherIcon";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import OpacityIcon from "@mui/icons-material/Opacity";

export default function WeatherForecast() {
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  useEffect(() => {
    const getWeatherForecast = async () => {
      try {
        setFetchError(false);
        const response = await fetch(
          "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en"
        );
        const responseJson = await response.json();

        setWeatherForecast(responseJson.weatherForecast);
      } catch (e) {
        setFetchError(true);
      }
    };

    getWeatherForecast();
  }, []);

  return (
    <Box witdh="100%" m={1} p={1} textAlign="center">
      {fetchError && (
        <Typography color="error">
          An error as occur. Try to reload the page
        </Typography>
      )}
      {weatherForecast ? (
        <>
          {weatherForecast.map((forecast, index, weatherForecast) => (
            <Box key={forecast.forecastDate}>
              <Grid container py="3px" px={1}>
                <Grid
                  item
                  xs={4}
                  sm={3}
                  textAlign="start"
                  display="flex"
                  alignItems="center"
                >
                  <Typography variant="h5">{`${forecast.week.slice(
                    0,
                    3
                  )}.`}</Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sm={3}
                  display="flex"
                  alignItems="center"
                  justifyContent={{ xs: "center", md: "start" }}
                >
                  <WeatherIcon
                    height={20}
                    width={20}
                    my={0}
                    icon={forecast.ForecastIcon}
                  />
                </Grid>
                <Grid
                  item
                  xs={4}
                  sm={3}
                  display="flex"
                  alignItems="center"
                  justifyContent={{ xs: "center", md: "start" }}
                >
                  <ThermostatIcon fontSize="small" />
                  <Typography>{`${forecast.forecastMintemp.value} - ${forecast.forecastMaxtemp.value}°C`}</Typography>
                </Grid>

                <Grid
                  item
                  xs={3}
                  display={{ xs: "none", sm: "flex" }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <OpacityIcon fontSize="small" />
                  <Typography>{`${forecast.forecastMinrh.value} - ${forecast.forecastMaxrh.value}%`}</Typography>
                </Grid>
              </Grid>
              {index !== weatherForecast.length - 1 && <Divider />}
            </Box>
          ))}
        </>
      ) : (
        <Skeleton variant="text" />
      )}
    </Box>
  );
}
