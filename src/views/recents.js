import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Button,
  Stack,
  IconButton,
  Popover,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";
import { Span } from "material";
import { useStorage } from "hooks";
import { withLayout } from "widgets";

// TODO: refractor numeric values to be properly formated
function Detailed() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    record: { result },
  } = location.state;

  const back = () => {
    navigate("/recents", { replace: true });
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
      <Box sx={{ my: 0.5 }}>
        <Typography textAlign="left">Total</Typography>
        <Typography
          sx={{
            fontSize: 30,
            textAlign: "left",
          }}
        >
          GHS {result.total}
        </Typography>
      </Box>

      <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
        <Box>
          <Typography variant="caption"> Actual (GHS) </Typography>
          <Typography variant="h5">{result.actual} </Typography>
        </Box>
        <Box>
          <Typography variant="caption"> e-Levy (GHS) </Typography>
          <Typography variant="h5">{result.tax} </Typography>
        </Box>
        <Box>
          <Typography variant="caption"> Charges (GHS) </Typography>
          <Typography variant="h5">{result.charges} </Typography>
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

      <Button fullWidth variant="contained" onClick={back} sx={{ ml: 0.5 }}>
        Back
      </Button>
    </Paper>
  );
}

function Recents() {
  const [anchor, setAnchor] = useState({
    active: false,
    value: null,
    index: "",
  });

  const [recents, setRecents] = useStorage("#recent$calc", []);
  const navigate = useNavigate();

  const handleAnchor = (e, idx) => {
    setAnchor((prev) => ({
      ...prev,
      active: !prev.active,
      value: prev.value ? null : e.currentTarget,
      index: idx,
    }));
  };

  const handleDelete = () => {
    handleAnchor();

    setRecents((prev) =>
      prev.filter((itm) => prev.indexOf(itm) !== anchor.index)
    );
  };

  if (recents.length === 0) {
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
          Your recents calculations will appear here when you click to save
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <List disablePadding>
        {recents.map((rec, idx) => (
          <ListItem
            key={idx}
            disablePadding
            disableGutters
            secondaryAction={
              <IconButton onClick={(e) => handleAnchor(e, idx)}>
                <MoreVert />
              </IconButton>
            }
          >
            <Paper
              sx={{
                my: 0.5,
                px: 1,
                py: 0.5,
                width: "100%",
              }}
            >
              <ListItemText
                sx={{ pl: 0.5 }}
                primary={`${rec.data.source}: GHS ${rec.data.amount}`}
                secondary={`Limit: GHS ${rec.data.limit}`}
                onClick={() =>
                  navigate(`/recents/${idx + 1}`, { state: { record: rec } })
                }
              />
            </Paper>
          </ListItem>
        ))}
      </List>

      <Popover
        open={anchor.active}
        anchorEl={anchor.value}
        onClose={handleAnchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Button variant="text" onClick={handleDelete}>
          Delete
        </Button>
      </Popover>
    </Box>
  );
}

const Detail = withLayout(Detailed);

export { Detail };
export default withLayout(Recents);
