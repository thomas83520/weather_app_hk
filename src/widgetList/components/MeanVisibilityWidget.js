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

export default function MeanVisibilityWidget({ id = "meanVisibilityGraph" }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getMeanVisibility = async () => {
      const response = await fetch(
        "https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=LTMV&lang=en&rformat=json"
      );
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      let newData = [];
      jsonResponse.data.forEach((element) => {
        var matches = element[2].match(/(\d+)/);
        if (matches)
          newData.push({ station: element[1], value: parseFloat(matches[0]) });
      });
      setData(newData);
      console.log(newData);
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
        {data.length > 0 && (
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart outerRadius={90} width={730} height={250} data={data}>
              <PolarGrid />
              {window.innerWidth > 430 && <PolarAngleAxis dataKey="station" />}
              <PolarRadiusAxis angle={30} />
              <Tooltip content={<CustomTooltip data={data} />} />
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
  const { data, label } = props;
  return (
    <Box p={1} sx={{ backgroundColor: "white" }}>
      {label !== undefined && (
        <Typography>{`${data[label].station} : ${data[label].value}km`}</Typography>
      )}
    </Box>
  );
};
