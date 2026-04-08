import LinearProgress from "@mui/material/LinearProgress";
import { Stack } from "@mui/system";

export const Progress = () => {
  return (
    <Stack sx={{ width: "100%", color: "grey.500" }} spacing={0}>
      <LinearProgress
        color="secondary"
        aria-label="Loading…"
        sx={{ height: "2px", borderRadius: "5px" }}
      />
    </Stack>
  );
};
