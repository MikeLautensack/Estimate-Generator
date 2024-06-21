import { Button, Link } from "@mui/material";
import React from "react";

const AuthButtonGroup = () => {
  return (
    <div
      id="auth-buttons-group"
      className="flex justify-center items-center gap-4"
    >
      <Button>
        <Link
          id="signin-button"
          className="text-blue-500 text-base font-medium rounded p-1 w-[70px]"
          href="/signin"
        >
          Sign In
        </Link>
      </Button>
      <Button>
        <Link
          id="signin-button"
          className="text-blue-500 text-base font-medium rounded p-1 w-[70px]"
          href="/signup"
        >
          Sign Up
        </Link>
      </Button>
    </div>
  );
};

export default AuthButtonGroup;
