import React, { useEffect, useState } from "react";

import WidgetWindow from "../../components/WidgetWindow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  Tooltip,
} from "recharts";
import { Box, Typography } from "@mui/material";
import { getValue } from "@mui/system";
import { useTheme } from "@emotion/react";

export default function MeanVisibilityWidget({ id = "meanVisibilityGraph" }) {
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState([]);
  const [windowWidth, setWindowWith] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWith(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  });

  useEffect(() => {
    const getMeanVisibility = async () => {
      setErrorMessage("");
      try {
        const response = await fetch(
          "https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=LTMV&lang=en&rformat=json"
        );
        const jsonResponse = await response.json();
        let newData = [];
        jsonResponse.data.forEach((element) => {
          var matches = element[2].match(/(\d+)/);
          if (matches)
            newData.push({
              station: element[1],
              value: parseFloat(matches[0]),
            });
        });
        setData(newData);
      } catch (e) {
        setErrorMessage("Failed to load data.");
      }
    };

    getMeanVisibility();
  }, []);

  return (
    <WidgetWindow
      icon={<VisibilityIcon fontSize="small" />}
      title="Mean visibility last 10 minutes (in km)"
      isAttachable="true"
      id={id}
    >
      <Box width="100%" minHeight={100}>
        {errorMessage.length > 0 && (
          <Box>
            <Typography color={theme.palette.error.main}>
              {errorMessage}
            </Typography>
          </Box>
        )}
        {data.length > 0 && (
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart outerRadius={90} width={730} height={250} data={data}>
              <PolarGrid />
              {windowWidth > 430 && <PolarAngleAxis dataKey="station" />}
              <PolarRadiusAxis angle={30} />
              <Tooltip
                content={<CustomTooltip data={data} width={windowWidth} />}
              />
              <Radar
                name="Visibility"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </Box>
    </WidgetWindow>
  );
}

const CustomTooltip = (props) => {
  const { data, label, width } = props;
  let value = "";
  let station = "";

  const getValue = () => {
    let obj = data.find((o) => o.station === label);
    return obj.value;
  };

  if (label !== undefined) {
    value = width > 430 ? getValue() : data[label].value;
    station = width > 430 ? label : data[label].station;
  }

  return (
    <Box p={1} sx={{ backgroundColor: "white" }}>
      {label !== undefined && (
        <Typography>{`${station} : ${value}km`}</Typography>
      )}
    </Box>
  );
};
