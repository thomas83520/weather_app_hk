import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";

import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  Tooltip,
  CircularProgress,
  FormControl,
} from "@mui/material";
import { Thermostat } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

import WidgetWindow from "../../components/WidgetWindow";
import { tempStation } from "../../constant";

// Set max date range from window width
const rangefromScreenSize = () => {
  if (window.innerWidth < 460) return 7;
  if (window.innerWidth < 1200) return 14;
  else return 21;
};
export default function TempWidget({ id = "tempChart" }) {
  const theme = useTheme();

  const maxDate = moment()
    .startOf("month")
    .subtract(1, "days")
    .startOf("month")
    .subtract(1, "days");
  const minDate = moment().set({ year: 2019, month: 0, date: 1 });
  const startDate = moment()
    .startOf("month")
    .subtract(1, "days")
    .startOf("month")
    .subtract(1, "days")
    .subtract(rangefromScreenSize(), "days");

  const [maxRange, setMaxRange] = useState(rangefromScreenSize());
  const [station, setStation] = useState("HKO");
  const [startingDate, setStartingDate] = useState(startDate);
  const [endDate, setEndDate] = useState(maxDate);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //Update max range from window width
  const handleResize = () => {
    setMaxRange(rangefromScreenSize());
  };

  //Add listener for window resize
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  });

  //Get temperature history from dates and station
  useEffect(() => {
    const getTempHistory = async () => {
      setLoading(true);
      setErrorMessage("");
      const dayDiff = endDate.diff(startingDate, "days");
      try {
        const responseMaxTemp = await fetch(
          `https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=CLMMAXT&lang=en&rformat=json&station=${station}&year=${startingDate.get(
            "year"
          )}&month=${startingDate.get("month") + 1}`
        );
        const jsonMaxTemp = await responseMaxTemp.json();
        const responseMinTemp = await fetch(
          `https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=CLMMINT&lang=en&rformat=json&station=${station}&year=${startingDate.get(
            "year"
          )}&month=${startingDate.get("month") + 1}`
        );
        const jsonMinTemp = await responseMinTemp.json();
        let newData = [];
        for (let i = 0; i <= dayDiff; i++) {
          if (jsonMaxTemp.data[startingDate.get("date") - 1 + i])
            newData.push({
              name: jsonMaxTemp.data[startingDate.get("date") - 1 + i][2],
              temp: [
                jsonMaxTemp.data[startingDate.get("date") - 1 + i][3],
                jsonMinTemp.data[startingDate.get("date") - 1 + i][3],
              ],
            });
        }
        setData(newData);
      } catch (e) {
        setErrorMessage("Failed to load data.");
      }
      setLoading(false);
    };
    if (startingDate && endDate && station) {
      getTempHistory();
    }
  }, [startingDate, endDate, station]);

  //Change date start
  const handleNewStartDate = (newStartDate) => {
    if (moment.max(newStartDate, endDate) === newStartDate) {
      setEndDate(newStartDate);
    }
    if (endDate.diff(newStartDate, "days") > maxRange) {
      const copieNewStartDate = moment().set({
        year: newStartDate.get("year"),
        month: newStartDate.get("month"),
        date: newStartDate.get("date"),
      });

      setEndDate(copieNewStartDate.add(maxRange, "days"));
    }
    setStartingDate(newStartDate);
  };

  //Change date end
  const handleNewEndDate = (newEndDate) => {
    if (moment.max(newEndDate, startingDate) === startingDate) {
      setStartingDate(newEndDate);
    }
    if (newEndDate.diff(startingDate, "days") > maxRange) {
      const copieNewEndDate = moment().set({
        year: newEndDate.get("year"),
        month: newEndDate.get("month"),
        date: newEndDate.get("date"),
      });

      setStartingDate(copieNewEndDate.subtract(maxRange, "days"));
    }
    setEndDate(newEndDate);
  };

  //Change station
  const handleChangeStation = (event) => {
    setStation(event.target.value);
  };

  return (
    <WidgetWindow
      icon={<Thermostat fontSize="small" />}
      title="Temperature range"
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
          <Box position="absolute" top="5px" right="10px">
            <CircularProgress size="1rem" />
          </Box>
        )}
        <Box textAlign="center">
          <Typography display={{ xs: "none", sm: "" }} mx={2}>
            Station :
          </Typography>
        </Box>
        <Box width="100%" maxWidth={350} px={1}>
          <FormControl fullWidth>
            <Select autoWidth value={station} onChange={handleChangeStation}>
              {tempStation.map((station) => (
                <MenuItem key={station.code} value={station.code}>
                  {station.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box
        m={1}
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Box textAlign="center">
          <Typography>Dates :</Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="caption" alignContent="center" mr="2px">
              Max. {maxRange} days range
            </Typography>
            <Tooltip title={`Set to ${maxRange} for visibility purposes`}>
              <InfoIcon fontSize="small" />
            </Tooltip>
          </Box>
        </Box>
        <Box mx={1}>
          <DatePicker
            label="Starting date"
            minDate={minDate}
            maxDate={maxDate}
            value={startingDate}
            onChange={(newValue) => {
              handleNewStartDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        <DatePicker
          disableFuture
          label="End date"
          minDate={minDate}
          maxDate={maxDate}
          value={endDate}
          onChange={(newValue) => {
            handleNewEndDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
      <Box width="100%">
        {errorMessage.length > 0 && (
          <Box>
            <Typography color={theme.palette.error.main}>
              {errorMessage}
            </Typography>
          </Box>
        )}
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <Bar dataKey="temp" fill="#8884d8"></Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          !loading && (
            <Typography
              color={theme.palette.info.main}
              textAlign="center"
              my={1}
            >
              No data for this time range
            </Typography>
          )
        )}
      </Box>
    </WidgetWindow>
  );
}
