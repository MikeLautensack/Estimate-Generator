"use client";

import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import Estimates from "./Estimates";
import ChangeOrders from "./ChangeOrders";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type DashboardTabsProps = {
  estimates: any[];
  changeOrders: any[];
};

const DashboardTabs = ({ estimates, changeOrders }: DashboardTabsProps) => {
  // State
  const [value, setValue] = useState(0);

  // Table functions
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  return (
    <Box components="div" className="flex flex-col">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={(event: React.SyntheticEvent, newValue: number) =>
            setValue(newValue)
          }
          aria-label="basic tabs example"
        >
          <Tab label="Estimates" {...a11yProps(0)} />
          <Tab label="Change Orders" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Estimates estimates={estimates} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ChangeOrders changeOrders={changeOrders} />
      </CustomTabPanel>
    </Box>
  );
};

export default DashboardTabs;
