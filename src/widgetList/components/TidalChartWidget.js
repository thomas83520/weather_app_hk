import React, { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import moment from "moment";

import {
  Box,
  Select,
  Typography,
  CircularProgress,
  MenuItem,
  TextField,
  Grid,
} from "@mui/material";
import { Waves } from "@mui/icons-material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

import {
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Tooltip,
} from "recharts";

import { tidalStation } from "../../constant";
import WidgetWindow from "../../components/WidgetWindow";

export default function TidalChartWidget({ id = "tidalChart" }) {
  const theme = useTheme();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [station, setStation] = useState("CCH");
  const [date, setDate] = useState(moment());
  const [startValue, setStartValue] = useState(
    moment().startOf("day").add(1, "hour")
  );
  const [endValue, setEndValue] = useState(moment().endOf("day"));
  const [data, setData] = useState([]);

  //Get tides heights and times
  useEffect(() => {
    const getTides = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=HHOT&lang=en&rformat=json&station=${station}&year=${date.get(
            "years"
          )}&month=${date.get("month") + 1}&day=${date.get("date")}`
        );

        const jsonResponse = await response.json();

        let newData = [];
        for (
          let i = startValue.get("hour") + 1;
          i < endValue.get("hour") + 2;
          i++
        ) {
          newData.push({ time: i - 1, value: jsonResponse.data[0][i] });
        }
        setData(newData);
      } catch (e) {
        setErrorMessage("Failed to load data.");
      }
      setLoading(false);
    };

    getTides();
  }, [station, date, startValue, endValue]);

  //Change station
  const handleChangeStation = (event) => {
    setStation(event.target.value);
  };

  return (
    <WidgetWindow
      icon={<Waves fontSize="small" />}
      title="Tides times and heights"
      isAttachable="true"
      id={id}
    >
      <Box
        position="relative"
        display="flex"
        width="100%"
        my={2}
        alignItems="center"
        justifyContent="center"
      >
        {loading && (
          <Box position="absolute" top="5px" left="10px">
            <CircularProgress size="1rem" />
          </Box>
        )}
        <Box mx={1} textAlign="center">
          <Typography mx={2}>Station :</Typography>
        </Box>
        <Select value={station} onChange={handleChangeStation}>
          {tidalStation.map((station) => (
            <MenuItem key={station.code} value={station.code}>
              {station.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Grid container my={2} spacing={2}>
        <Grid item xs={12} sm={12} lg={4}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mx={1}
          >
            <DatePicker
              label="Date"
              minDate={moment().set({ year: 2022, month: 0, date: 1 })}
              maxDate={moment().set({ year: 2024, month: 11, date: 31 })}
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box display="flex" justifyContent="center" px={1}>
            <TimePicker
              ampmInClock
              views={["hours"]}
              inputFormat="HH:00"
              mask="__:__"
              label="From"
              value={startValue}
              onChange={(newValue) => {
                setStartValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box display="flex" justifyContent="center" px={1}>
            <TimePicker
              ampmInClock
              views={["hours"]}
              inputFormat="HH:00"
              mask="__:__"
              label="To"
              value={endValue}
              onChange={(newValue) => {
                setEndValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        </Grid>
      </Grid>
      <Box width="100%">
        {errorMessage.length > 0 && (
          <Box>
            <Typography color={theme.palette.error.main}>
              {errorMessage}
            </Typography>
          </Box>
        )}
        {data.length > 0 && (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              width={730}
              height={250}
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Box>
    </WidgetWindow>
  );
}
