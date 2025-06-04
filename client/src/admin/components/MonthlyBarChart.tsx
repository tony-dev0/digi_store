// material-ui
import { useTheme } from "@mui/material/styles";

import { BarChart } from "@mui/x-charts/BarChart";

const data = [80, 95, 70, 42, 65, 55, 78];
const xLabels = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

// ==============================|| MONTHLY BAR CHART ||============================== //

export default function MonthlyBarChart() {
  const theme = useTheme();
  const axisFonstyle = { fontSize: 10, fill: theme.palette.text.secondary };

  return (
    <BarChart
      height={350}
      series={[{ data, label: "Series-1" }]}
      xAxis={[
        {
          data: xLabels,
          scaleType: "band",
          disableLine: true,
          disableTicks: true,
          tickLabelStyle: axisFonstyle,
        },
      ]}
      yAxis={[{ position: "none" }]}
      hideLegend={true}
      slotProps={{ bar: { rx: 5, ry: 5 } }}
      axisHighlight={{ x: "none" }}
      margin={{ left: 20, right: 20 }}
      // colors={[theme.palette.info.light]}
      colors={["#8280ae"]}
      sx={{ "& .MuiBarElement-root:hover": { opacity: 0.6 } }}
    />
  );
}
