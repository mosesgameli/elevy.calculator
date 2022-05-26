import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  IconButton,
  ButtonGroup,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";

import { Span } from "material";
import { computeTax } from "utils";
import { useCalculateContext, useNotify } from "contexts";

function RenderResult() {
  const { notify } = useNotify();
  const { stepValue, handleBack, handleReset, handleSave } =
    useCalculateContext();
  const { total, actual, tax, charges } = computeTax(stepValue);

  const save = () => {
    const result = { total, actual, tax, charges };
    handleSave(result);

    notify("Result is saved to recents");
  };

  return (
    <Paper
      sx={{
        mt: 3,
        p: 2,
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Stack direction="row" justifyContent="flex-end">
        <IconButton onClick={handleBack}>
          <Cancel />
        </IconButton>
      </Stack>

      <Box sx={{ my: 0.5 }}>
        <Typography textAlign="left">Total</Typography>
        <Typography
          sx={{
            fontSize: 30,
            textAlign: "left",
          }}
        >
          GHS {total}
        </Typography>
      </Box>

      <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
        <Box>
          <Typography variant="caption"> Actual (GHS) </Typography>
          <Typography variant="h5">{actual} </Typography>
        </Box>
        <Box>
          <Typography variant="caption"> e-Levy (GHS) </Typography>
          <Typography variant="h5">{tax} </Typography>
        </Box>
        <Box>
          <Typography variant="caption"> Charges (GHS) </Typography>
          <Typography variant="h5">{charges} </Typography>
        </Box>
      </Stack>

      <Span
        sx={{
          m: 0,
          pb: 1,
          fontSize: "12px",
          color: (theme) => theme.palette.warning.main,
        }}
      >
        Disclaimer: We only try to generate accurate results as much as possible
      </Span>
      <ButtonGroup>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleReset}
          sx={{ mr: 0.5 }}
        >
          Reset
        </Button>
        <Button fullWidth variant="contained" onClick={save} sx={{ ml: 0.5 }}>
          Save
        </Button>
      </ButtonGroup>
    </Paper>
  );
}

export default RenderResult;
