"use client";

import { estimatesChartArrayProps } from "@/types/types";
import React from "react";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  Rectangle, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

const EstimatePriceChart = ({chartArray}: estimatesChartArrayProps) => {
  return (
    <div className="w-full h-full">
        <ResponsiveContainer 
          width="100%" 
          height="100%" 
          className=""
        >
            <BarChart
              className="" 
              data={chartArray}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="meanTotal" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
}

export default EstimatePriceChart;