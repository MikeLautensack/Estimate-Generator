import {
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { eq } from "drizzle-orm";
import AccountForm from "@/components/forms/AccountForm";
import DIContainer from "@/core/DIContainer";
import { redirect } from "next/navigation";
import HandleDeleteAccount from "@/components/buttons/HandleDeleteAccount";
import { format } from "date-fns";

const page = async () => {
  // Auth
  const user = await DIContainer.authUseCases.getUser();
  if (!user) redirect("/signin");

  console.log("user test, ", user);
  console.log("user.identities.provider test, ", user.identities[0].provider);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        maxWidth: "600px",
        mx: "auto",
        py: 6,
        px: 2,
      }}
      component="main"
    >
      <Typography variant="h4" component="h1">
        Account Settings
      </Typography>

      {/* Auth Info Card */}
      <Card>
        <CardContent>
          <Typography variant="h6">Your Info</Typography>

          <List>
            <ListItem>
              <ListItemText primary="Email" secondary={user.email} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Auth Provider"
                secondary={user.identities[0].provider} // e.g. "Google", "Password", etc.
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Account Created"
                secondary={format(new Date(user.created_at), "PPP")}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" color="error">
            Danger Zone
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Deleting your account is permanent and cannot be undone.
          </Typography>
          <HandleDeleteAccount />
        </CardContent>
      </Card>
    </Box>
  );
};

export default page;
