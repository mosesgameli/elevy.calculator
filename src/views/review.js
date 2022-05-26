import { Paper, Typography } from "@mui/material";
import { withLayout } from "widgets";

function Review() {
  return (
    <Paper
      sx={{
        mt: 3,
        p: 3,
        minHeight: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography textAlign="center">
        Soon, you will be able to provide feedback on how to improve this app
      </Typography>
    </Paper>
  );
}

export default withLayout(Review);
