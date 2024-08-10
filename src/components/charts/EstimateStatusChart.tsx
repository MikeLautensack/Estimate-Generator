"use client";

import { Card } from "@mui/material";
import { ChartsLegend, ResponsiveChartContainer } from "@mui/x-charts";

type EstimateStatusChartProps = {
  estimates: any[];
};

const EstimateStatusChart = ({ estimates }: EstimateStatusChartProps) => {
  const generateColor = (name: string): string => {
    if (name === "accepted") {
      return "#0275d8";
    } else if (name === "rejected") {
      return "#FF0000";
    } else if (name === "change order requested") {
      return "#f0ad4e";
    } else if (name === "pending approval") {
      return "9d9d9d";
    } else if (name === "work completed") {
      return "#039487";
    } else if (name === "work in progress (edited)") {
      return "#30D5C8";
    } else if (name === "work in progress") {
      return "#add8e6";
    }
    return "";
  };

  return (
    <Card
      className="w-full h-full"
      sx={{ backgroundColor: "surfaceContainerLow" }}
    >
      <ResponsiveChartContainer
        series={[
          { type: "line", data: [], label: "Gross Revenue" },
          { type: "line", data: [], label: "Total Estimated" },
        ]}
        xAxis={[{ scaleType: "point", data: [], id: "x-axis-id" }]}
        yAxis={[{ scaleType: "point", data: [], id: "y-axis-id" }]}
        margin={{ left: 80 }}
      >
        <ChartsLegend />
      </ResponsiveChartContainer>
    </Card>
  );
};

export default EstimateStatusChart;
