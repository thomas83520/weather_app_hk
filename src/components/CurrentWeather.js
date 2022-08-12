import { Box, Typography, Button, Grid, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import WeatherIcon from "./WeatherIcon";
import WeatherInfoDisplay from "./WeatherInfoDisplay";

export default function CurrentWeather() {
  const [tempDefault, setTempDefault] = useState(null);
  const [humidityDefault, setHumidityDefault] = useState(null);
  const [tempMore, setTempMore] = useState(null);
  //const [humidityMore, setHumidityMore] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [icons, setIcons] = useState(null);

  useEffect(() => {
    const loadInfo = async () => {
      const response = await fetch(
        "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en"
      );
      const jsonResponse = await response.json();
      setIcons(jsonResponse.icon);

      const tempData = jsonResponse.temperature;
      const humidityData = jsonResponse.humidity;
      const humidityMoreArray = [];
      const tempMoreArray = [];
      tempData.data.map((temperature) => {
        if (temperature.place === "Hong Kong Observatory")
          setTempDefault(temperature);
        else tempMoreArray.push(temperature);

        return null;
      });

      humidityData.data.map((humidity) => {
        if (humidity.place === "Hong Kong Observatory")
          setHumidityDefault(humidity);
        else humidityMoreArray.push(humidity);

        return null;
      });

      setTempMore(tempMoreArray);
    };

    loadInfo();
  }, []);
  return (
    <Box textAlign="center">
      <Box display="flex" justifyContent="space-around">
        {icons ? (
          icons.map((icon) => (
            <WeatherIcon key={icon} height={70} number={50} icon={icon} />
          ))
        ) : (
          <Skeleton
            variant="rounded"
            height={70}
            width={70}
            sx={{ padding: "8px", marginY: "8px" }}
          />
        )}
      </Box>
      <Grid container py={1}>
        <Grid item xs={6}>
          <WeatherInfoDisplay info={tempDefault} unit="°C" />
        </Grid>
        <Grid item xs={6}>
          <WeatherInfoDisplay info={humidityDefault} unit="%" />
        </Grid>
      </Grid>
      <Button size="small" onClick={() => setShowMore(!showMore)}>
        {showMore ? "show less" : "show more"}
      </Button>
      <Box display={showMore ? "block" : "none"}>
        {tempMore ? (
          tempMore.map((temp) => (
            <Box m="auto" width={{ xs: "60%", md: "30%" }} key={temp.place}>
              <Typography textAlign="start" variant="body2">
                {temp.place}
              </Typography>
              <Typography variant="h5"> {temp.value}°C</Typography>
            </Box>
          ))
        ) : (
          <Box width="100%">
            <Skeleton variant="text" />
          </Box>
        )}
        <Button size="small" onClick={() => setShowMore(false)}>
          show less
        </Button>
      </Box>
    </Box>
  );
}
