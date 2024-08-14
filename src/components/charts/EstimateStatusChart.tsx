"use client";

import useCalcPieData from "@/hooks/useCalcPieData";
import { Card, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";

type EstimateStatusChartProps = {
  estimates: any[];
};

const EstimateStatusChart = ({ estimates }: EstimateStatusChartProps) => {
  // Hooks
  const data = useCalcPieData(estimates);
  return (
    <Card
      className="w-full h-full p-8 flex flex-col gap-4"
      sx={{ backgroundColor: "surfaceContainerLow" }}
    >
      <Typography variant="h6" color="primary" className="h-max">
        Estimate Status Chart
      </Typography>
      <div className="w-full h-full">
        <PieChart
          series={[
            {
              data: data,
            },
          ]}
          margin={{ right: 256 }}
        />
      </div>
    </Card>
  );
};

export default EstimateStatusChart;
