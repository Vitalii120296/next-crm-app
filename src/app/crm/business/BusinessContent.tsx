import { getBusinessService } from "@/services/business/getBusiness";
import { Box, Typography } from "@mui/material";
import BusinessPage from "./BusinessPage";

export async function BusinessContent() {
  const business = await getBusinessService();

  if (!business) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography color="text.secondary">
          Business profile not found. Please sign in again.
        </Typography>
      </Box>
    );
  }

  return <BusinessPage businessPayload={business} />;
}
