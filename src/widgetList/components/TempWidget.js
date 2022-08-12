import { Thermostat } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import WidgetWindow from "../../components/WidgetWindow";
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

import { tempStation } from "../../constant";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  LineChart,
  Tooltip as RechartsTooltip,
  Line,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const rangefromScreenSize = () => {
  if (window.innerWidth < 460) return 5;
  else return 5;
};
const data = [
  { name: "Page A", uv: [300, 450] },
  { name: "Page B", uv: 400 },
  { name: "Page C", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page D", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page D", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page D", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page D", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page D", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page D", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page D", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page D", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page D", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page D", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page D", uv: 400, pv: 2400, amt: 2400 },
];
export default function TempWidget() {
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
  const [isAttach, setIsAttach] = useState(false);
  const [station, setStation] = useState("HKO");
  const [startingDate, setStartingDate] = useState(startDate);
  const [endDate, setEndDate] = useState(maxDate);
  const [data, setData] = useState([]);

  const handleResize = () => {
    setMaxRange(rangefromScreenSize());
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  useEffect(() => {
    const getMaxTempHistory = async () => {
      const dayDiff = endDate.diff(startingDate, "days");
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
      console.log(`https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=CLMMINT&lang=en&rformat=json&station=${station}&year=${startingDate.get(
        "year"
      )}&month=${startingDate.get("month") + 1}`)
      for (let i = 0; i <= dayDiff; i++) {console.log(
        jsonMaxTemp.data[startingDate.get("date") - 1 + i],
        jsonMinTemp.data[startingDate.get("date") - 1 + i]
      );
        console.log(
          jsonMaxTemp.data[startingDate.get("date") - 1 + i][3],
          jsonMinTemp.data[startingDate.get("date") - 1 + i][3]
        );
        newData.push({
          name: jsonMaxTemp.data[startingDate.get("date") - 1 + i][2],
          uv: [
            jsonMaxTemp.data[startingDate.get("date") - 1 + i][3],
            jsonMinTemp.data[startingDate.get("date") - 1 + i][3],
          ],
        });
      }
      setData(newData);
    };
    if (startingDate && endDate && station) {
      getMaxTempHistory();
    }
  }, [startingDate, endDate, station]);

  const handleAttachment = () => {
    setIsAttach(!isAttach);
  };

  const handleNewStartDate = (newStartDate) => {
    if (moment.max(newStartDate, endDate) === newStartDate) {
      console.log("max");
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
    console.log(newStartDate);
    setStartingDate(newStartDate);
  };
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

  const handleChangeStation = (event) => {
    setStation(event.target.value);
  };
  const handleRemove = () => {};

  return (
    <WidgetWindow
      icon={<Thermostat fontSize="small" />}
      title="Temperature range"
      isAttach={isAttach}
      isAttachable="true"
      attach={handleAttachment}
      remove={handleRemove}
    >
      <Box
        display="flex"
        width="100%"
        my={2}
        alignItems="center"
        justifyContent="center"
      >
        <Box mx={1} textAlign="center">
          <Typography mx={2}>Station :</Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="caption" alignContent="center" mr="2px">
              Max. {maxRange} days range
            </Typography>
            <Tooltip title={`Set to ${maxRange} for visibility purposes`}>
              <InfoIcon fontSize="small" />
            </Tooltip>
          </Box>
        </Box>
        <Select value={station} onChange={handleChangeStation}>
          {tempStation.map((station) => (
            <MenuItem key={station.code} value={station.code}>
              {station.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box
        m={1}
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Typography>Dates :</Typography>
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
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="name" />
            <YAxis />
            <RechartsTooltip />
            <Bar dataKey="uv" fill="#8884d8">
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </WidgetWindow>
  );
}
