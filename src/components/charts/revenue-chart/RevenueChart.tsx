"use client";

import { Autocomplete, Card, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { LinePlot } from "@mui/x-charts/LineChart";
import {
  ChartsXAxis,
  ResponsiveChartContainer,
  ChartsYAxis,
  ChartsLegend,
} from "@mui/x-charts";
import {
  calculateGrossRevenue,
  calculateTotalEstimated,
  calculateXLabels,
  calculateYLabels,
} from "./callbacks";

export type Unit = "daily" | "weekly" | "bi-weekly" | "monthly" | "annually";

export type DateObject = {
  label: string;
  date: Date;
};

type ChartData = {
  xLabels: DateObject[];
  yLabels: number[];
  grossRevenue: number[];
  totalEstimated: number[];
};

type RevenueChartProps = {
  estimates: any[];
};

const RevenueChart = ({ estimates }: RevenueChartProps) => {
  // State
  const [xunit, setXUnit] = useState<Unit>("weekly");
  const [chartData, setChartData] = useState<ChartData>({
    xLabels: [],
    yLabels: [],
    grossRevenue: [],
    totalEstimated: [],
  });

  // Callbacks
  const calcXLabels = useCallback(calculateXLabels, []);
  const calcYLabels = useCallback(calculateYLabels, []);
  const calcGrossRevenue = useCallback(calculateGrossRevenue, []);
  const calctTotalEstimated = useCallback(calculateTotalEstimated, []);

  const updateChart = useCallback(
    (newValue: Unit) => {
      // Calculate new values
      const xlabels = calcXLabels(newValue);
      const ylabels = calcYLabels(estimates);
      const revenue = calcGrossRevenue(estimates, xlabels);
      const totalestimated = calctTotalEstimated(estimates, xlabels);

      // Set state
      setXUnit(newValue);
      setChartData({
        xLabels: xlabels,
        yLabels: ylabels,
        grossRevenue: revenue,
        totalEstimated: totalestimated,
      });
    },
    [
      calcGrossRevenue,
      calcXLabels,
      calcYLabels,
      calctTotalEstimated,
      estimates,
    ],
  );

  // Effects
  useEffect(() => {
    updateChart(xunit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      sx={{ backgroundColor: "surfaceContainerLow" }}
      className="flex flex-col gap-4 justify-start items-end rounded-lg p-4"
    >
      <div className="flex justify-between items-center w-full">
        <Typography variant="h6" color="primary" className="h-max">
          Revenue Chart
        </Typography>
        <Autocomplete
          value={{
            label: xunit[0].toUpperCase() + xunit.substring(1),
            value: xunit,
          }}
          options={[
            { label: "Daily", value: "daily" },
            { label: "Weekly", value: "weekly" },
            { label: "Bi Weekly", value: "bi-weekly" },
            { label: "Monthly", value: "monthly" },
            { label: "Annually", value: "annually" },
          ]}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          onChange={(_, newValue: any) => {
            updateChart(newValue.value);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Unit" sx={{ width: "10rem" }} />
          )}
        />
      </div>
      <div className="w-full h-full">
        <ResponsiveChartContainer
          xAxis={[
            {
              scaleType: "point",
              data: chartData.xLabels.map((label) => label.label),
              id: "x-axis-id",
            },
          ]}
          yAxis={[
            {
              // scaleType: "linear",
              data: chartData.yLabels,
              id: "y-axis-id",
            },
          ]}
          series={[
            {
              type: "line",
              data: chartData.grossRevenue,
              label: "Gross Revenue",
            },
            {
              type: "line",
              data: chartData.totalEstimated,
              label: "Total Estimated",
            },
          ]}
        >
          <ChartsLegend />
          <ChartsYAxis position="left" axisId="y-axis-id" />
          <ChartsXAxis position="bottom" axisId="x-axis-id" />
          <LinePlot />
        </ResponsiveChartContainer>
      </div>
    </Card>
  );
};

export default RevenueChart;
