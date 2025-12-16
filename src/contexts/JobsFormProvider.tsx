"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type Mode = "create" | "update" | "delete";

type JobsFormContextValue = {
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const JobsFormContext = createContext<JobsFormContextValue | undefined>(
  undefined,
);

type JobsFormProviderProps = {
  children: ReactNode;
};

export const JobsFormProvider = ({ children }: JobsFormProviderProps) => {
  const [mode, setMode] = useState<Mode>("create");
  const [open, setOpen] = useState<boolean>(false);

  const value: JobsFormContextValue = { mode, setMode, open, setOpen };

  return (
    <JobsFormContext.Provider value={value}>
      {children}
    </JobsFormContext.Provider>
  );
};

export const useJobsFormContext = (): JobsFormContextValue => {
  const context = useContext(JobsFormContext);
  if (!context) {
    throw new Error(
      "useJobsFormContext must be used within a <JobsFormProvider>",
    );
  }
  return context;
};
