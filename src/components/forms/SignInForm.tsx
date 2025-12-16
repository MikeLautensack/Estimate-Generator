"use client";

import React, { useCallback, useState } from "react";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { signInWithGoogle } from "@/actions/auth";
import GoogleIcon from "@mui/icons-material/Google";

const SignInForm = () => {
  // State
  const [loading, setLoading] = useState(false);

  // Callbacks
  const handleGoogleSignIn = useCallback(async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="m-8 p-4 rounded-lg">
      <Stack spacing={2} alignItems="center">
        <Typography color="onSurface" variant="h4">
          Sign Up Free
        </Typography>

        <Button
          variant="contained"
          onClick={handleGoogleSignIn}
          disabled={loading}
          startIcon={
            loading ? (
              <CircularProgress size={20} sx={{ color: "#001824" }} />
            ) : (
              <GoogleIcon />
            )
          }
          sx={{
            backgroundColor: "white",
            color: "black",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
            width: "100%",
            maxWidth: "300px",
          }}
        >
          {loading ? "Signing in..." : "Continue with Google"}
        </Button>

        <Divider
          flexItem
          sx={{ color: "outlineVariant", borderWidth: "1px" }}
        />

        <div className="flex justify-between items-center gap-1">
          <Typography color="onSurface" variant="body1">
            Already have an account?
          </Typography>
          <Button variant="text" disabled={loading}>
            Login
          </Button>
        </div>
      </Stack>
    </div>
  );
};

export default SignInForm;
