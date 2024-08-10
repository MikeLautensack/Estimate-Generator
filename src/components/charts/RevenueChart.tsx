"use client";

import { Autocomplete, Card, TextField } from "@mui/material";
import React, { useState } from "react";
import { LineChart, LinePlot } from "@mui/x-charts/LineChart";
import useCalcRevenueXLabels from "@/hooks/useCalcRevenueXLabels";
import useCalcGrossRevenueArr from "@/hooks/useCalcGrossRevenueArr";
import useCalcTotalEstimatedArr from "@/hooks/useCalcTotalEsimatedArr";
import {
  ChartsXAxis,
  ResponsiveChartContainer,
  ChartsYAxis,
  ChartsLegend,
  ChartsClipPath,
} from "@mui/x-charts";
import useCalcRevenueYLabels from "@/hooks/useCalcRevenueYLabels";

type Unit = "daily" | "weekly" | "bi-weekly" | "monthly" | "annually";

type RevenueChartProps = {
  estimates: any[];
};

const RevenueChart = ({ estimates }: RevenueChartProps) => {
  // State
  const [xunit, setXUnit] = useState<Unit>("weekly");

  // Hooks
  const xLabels = useCalcRevenueXLabels(xunit);
  const yLabels = useCalcRevenueYLabels(estimates);
  const grossRevenue = useCalcGrossRevenueArr(estimates, xLabels, xunit);
  const totalEstimated = useCalcTotalEstimatedArr(estimates, xLabels, xunit);

  console.log("testing xLabels", xLabels);
  console.log("testing yLabels", yLabels);
  console.log("testing grossRevenue", grossRevenue);
  console.log("testing totalEstimated", totalEstimated);

  return (
    <Card
      sx={{ backgroundColor: "surfaceContainerLow" }}
      className="flex flex-col gap-4 justify-start items-end rounded-lg p-4"
    >
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
          setXUnit(newValue.value);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Unit" sx={{ width: "10rem" }} />
        )}
      />
      <div className="w-full h-full">
        <ResponsiveChartContainer
          series={[
            {
              type: "line",
              data: grossRevenue,
              label: "Gross Revenue",
            },
            {
              type: "line",
              data: totalEstimated,
              label: "Total Estimated",
            },
          ]}
          xAxis={[
            {
              scaleType: "point",
              data: xLabels.map((label) => label.label),
              id: "x-axis-id",
            },
          ]}
          yAxis={[
            {
              scaleType: "linear",
              data: yLabels,
              id: "y-axis-id",
            },
          ]}
          // margin={{ left: 80 }}
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
