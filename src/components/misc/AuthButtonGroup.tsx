import { Button } from "@mui/material";
import React from "react";
import Link from "next/link";

const AuthButtonGroup = () => {
  return (
    <div
      id="auth-buttons-group"
      className="flex justify-center items-center gap-4"
    >
      <Link id="signin-button" href="/signin">
        <Button variant="outlined">Sign In</Button>
      </Link>
      <Link id="signin-button" href="/signup">
        <Button variant="contained">Sign Up</Button>
      </Link>
    </div>
  );
};

export default AuthButtonGroup;
