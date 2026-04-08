import { Stack } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";

export const Loader = () => {
  return (
    <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
      <CircularProgress color="secondary" aria-label="Loading…" />
    </Stack>
  );
};
