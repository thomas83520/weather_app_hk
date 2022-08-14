import React, { useEffect, useState } from "react";
import WidgetWindow from "../../components/WidgetWindow";
import { Thunderstorm } from "@mui/icons-material";
import { Box, Typography, Button } from "@mui/material";

import { Sector, ResponsiveContainer, PieChart, Pie } from "recharts";
import { useTheme } from "@emotion/react";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  const translateValueYFromScreenWidth = (cos, offset) => {
    return 0 + offset;
  };

  const translateValueXFromScreenWidth = (cos) => {
    if (window.innerWidth < 330) return cos > 0 ? 0 : 8;
    return 0;
  };

  const translateRateYFromScreenWidth = (cos, offset) => {
    let value = 0;
    if (window.innerWidth < 440) if (ey < 100) value = -35;
    return value + offset;
  };

  const translateRateXFromScreenWidth = (cos) => {
    if (window.innerWidth < 440) return cos > 0 ? -70 : 70;
    if (window.innerWidth < 460) return cos < 0 ? 30 : -30;
    if (window.innerWidth < 500) return cos < 0 ? 20 : -20;
    return 0;
  };

  return (
    <g>
      <text x={cx} y={cy} dy={-112} textAnchor="middle" fill={fill}>
        {payload.territory}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={translateValueYFromScreenWidth(cos, 0)}
        dx={translateValueXFromScreenWidth(cos)}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}`}</text>
      <text
        display={window.innerWidth < 360 ? "none" : ""}
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={translateRateYFromScreenWidth(cos, 18)}
        dx={translateRateXFromScreenWidth(cos)}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function LigthningCountWidget({ id = "lightningCountGraph" }) {
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalGround, setTotalGround] = useState(0);
  const [totalCloud, setTotalCloud] = useState(0);
  const [useRandomData, setUseRandomData] = useState(false);
  const [randomData, setRadomData] = useState([]);

  useEffect(() => {
    const getLightingCount = async () => {
      setErrorMessage("");
      try {
        const response = await fetch(
          "https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=LHL&lang=en&rformat=json"
        );
        const jsonResponse = await response.json();
        if (jsonResponse.data && jsonResponse.data.length >= 2) {
          setTotalCloud(jsonResponse.data[jsonResponse.data.length - 1][3]);
          setTotalGround(jsonResponse.data[jsonResponse.data.length - 2][3]);
          let lightingCount = [];
          for (let i = 0; i < jsonResponse.data.length - 2; i++) {
            lightingCount.push({
              territory: jsonResponse.data[i][2],
              value: jsonResponse.data[i][3],
            });
          }
          setData(lightingCount);
        }
      } catch (e) {
        setErrorMessage("Failed to load data.");
      }
    };

    getLightingCount();
  }, []);

  const handleRandomData = () => {
    setRadomData([
      {
        territory: "Lantau",
        value: 8,
      },
      {
        territory: "Hong Kong Island and Kowloon",
        value: 5,
      },
      {
        territory: "New Territories East",
        value: 1,
      },
      {
        territory: "New Territories West",
        value: 4,
      },
    ]);
    setUseRandomData(true);
  };
  return (
    <WidgetWindow
      icon={<Thunderstorm fontSize="small" />}
      title="Lightning count today"
      isAttachable="true"
      id={id}
    >
      <Box minHeight="150px" height="100%" width="100%">
        <Box
          textAlign="center"
          width="100%"
          display="flex"
          justifyContent="space-between"
        >
          <Box py={1} px={3}>
            <Typography>Total cloud to cloud</Typography>
            <Typography>{totalCloud}</Typography>
          </Box>
          <Box py={1} px={3}>
            <Typography>Total cloud to ground</Typography>
            <Typography>{totalGround}</Typography>
          </Box>
        </Box>
        {errorMessage.length > 0 && (
          <Box>
            <Typography color={theme.palette.error.main}>
              {errorMessage}
            </Typography>
          </Box>
        )}
        {useRandomData && (
          <Box sx={{ color: "warning.main" }}>
            <Typography textAlign="center">This is not real data</Typography>
          </Box>
        )}
        {totalGround > 0 || useRandomData ? (
          <Box width="100%" height="250px">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={useRandomData ? randomData : data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        ) : (
          <Box textAlign="center">
            <Typography>
              No lighting recored on the ground by the observatory.
            </Typography>
            <Button onClick={handleRandomData}>
              Load graph with random data
            </Button>
          </Box>
        )}
      </Box>
    </WidgetWindow>
  );
}
