"use client";

import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { JobsSelect } from "@/db/schemas/jobs";

type JobsTableMenuProps = {
  jobs: JobsSelect;
};

const JobsTableMenu = ({ jobs }: JobsTableMenuProps) => {
  // State
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  // Hooks
  const router = useRouter();

  const open = Boolean(anchor);

  // Event Handlers
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  // Callbacks
  const deleteJob = useCallback(async () => {
    const res = await fetch("", {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    }
  }, [jobs.contractor_user_id, jobs.id, router]);

  return (
    <Box component="div" className="">
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu id="basic-menu" anchorEl={anchor} open={open} onClose={handleClose}>
        {/* <Link
          href={`${process.env.NEXT_PUBLIC_HOST}contractor-dashboard/jobs/${estimate.id}`}
        >
          <MenuItem onClick={handleClose}>View Job</MenuItem>
        </Link>
        <Link
          href={`${process.env.NEXT_PUBLIC_HOST}contractor-dashboard/jobs/form/${estimate.id}`}
        >
          <MenuItem onClick={handleClose}>Update Job</MenuItem>
        </Link> */}
        <MenuItem
          onClick={() => {
            deleteJob();
            handleClose();
          }}
        >
          Delete Estimate
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default JobsTableMenu;
