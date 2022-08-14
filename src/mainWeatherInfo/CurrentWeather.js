import React, { useEffect, useState } from "react";

import { Box, Typography, Button, Grid, Skeleton } from "@mui/material";
import WeatherIcon from "./components/WeatherIcon";
import WeatherInfoDisplay from "./components/WeatherInfoDisplay";

export default function CurrentWeather() {
  const [tempDefault, setTempDefault] = useState(null);
  const [humidityDefault, setHumidityDefault] = useState(null);
  const [tempMore, setTempMore] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [icons, setIcons] = useState(null);

  //Load current weather info
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
          <Grid container>
            {tempMore.map((temp) => (
              <Grid key={temp.place} item xs={12} sm={6} lg={4}>
                <Box
                  mx="auto"
                  my={2}
                  width={{ xs: "60%", md: "30%" }}
                  key={temp.place}
                  sx={{
                    borderRadius: "5px",
                    boxShadow:
                      "3px 3px 3px rgba(0,0,0,0.2),-0px -0px 3px rgba(200,200,200,0.7)",
                  }}
                  p={1}
                >
                  <Typography textAlign="start" variant="body2">
                    {temp.place}
                  </Typography>
                  <Typography variant="h5"> {temp.value}°C</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
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
