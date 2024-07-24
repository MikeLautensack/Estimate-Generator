"use client";

import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import ProfileInfoTab from "./ProfileInfoTab";
import { Session } from "next-auth";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type ProfilePageTabsProps = {
  session: Session;
  profileData: any;
};

const ProfilePageTabs = ({ session, profileData }: ProfilePageTabsProps) => {
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
          <Box
            component="div"
            sx={{ paddingTop: "1rem", paddingBottom: "1rem" }}
          >
            {children}
          </Box>
        )}
      </div>
    );
  }

  return (
    <Box component="div" className="flex flex-col w-full">
      <Box component="div" sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={(event: React.SyntheticEvent, newValue: number) =>
            setValue(newValue)
          }
          aria-label="basic tabs example"
        >
          <Tab label="Profile Info" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ProfileInfoTab session={session} profileData={profileData} />
      </CustomTabPanel>
    </Box>
  );
};

export default ProfilePageTabs;
