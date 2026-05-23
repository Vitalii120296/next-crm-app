import { Box } from "@mui/material";
import { Progress } from "@/components/Progress";

export default function Loading() {
  return (
    <Box sx={{ width: "100%", minHeight: 4 }}>
      <Progress />
    </Box>
  );
}
