import ManageSubscription from "@/components/buttons/ManageSubscription";
import OpenStripeBillingPortal from "@/components/buttons/OpenStripeBillingPortal";
import DIContainer from "@/core/DIContainer";
import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { redirect } from "next/navigation";

export default async function Page() {
  // Auth
  const user = await DIContainer.authUseCases.getUser();
  if (!user) redirect("/signin");
  const subscription = await DIContainer.stripeUseCases.getUserSubscription();
  console.log("testing subscription", subscription);
  const currentPeriodEnd = new Date(subscription?.currentPeriodEnd!);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        maxWidth: "600px",
        mx: "auto",
        py: 6,
      }}
    >
      <Typography variant="h4" component="h1">
        Billing Settings
      </Typography>

      {/* Current Plan Summary */}
      <Card>
        <CardContent>
          <Typography variant="h6">Current Plan</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {`${} - ${}`}Contractor Pro – $29/mo
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Renews on ${currentPeriodEnd}`}
          </Typography>

          <Box sx={{ mt: 2 }}>
            <ManageSubscription />
          </Box>
        </CardContent>
      </Card>

      {/* Usage Summary */}
      <Card>
        <CardContent>
          <Typography variant="h6">Usage Summary</Typography>
          <List>
            <ListItem>
              <ListItemText primary="Estimates" secondary="23 / 100" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Customers" secondary="12 / Unlimited" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Change Orders" secondary="6 / 50" />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Cancel or Change Plan */}
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Want to cancel or change your plan?
        </Typography>
        <OpenStripeBillingPortal />
      </Box>
    </Box>
  );
}
