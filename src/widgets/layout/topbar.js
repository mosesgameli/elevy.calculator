import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

// TODO: add switch for toggling theme
function Topbar({ toggleTheme }) {
  return (
    <Box>
      <AppBar position="fixed" elevation={0} enableColorOnDark>
        <Container
          sx={{
            maxWidth: "500px !important",
          }}
        >
          <Toolbar sx={{ minHeight: 45 }}>
            <Box sx={{ flex: 1 }}>
              <Typography fontSize={20}>eLevy Calculator</Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* because appbar position is fixed, empty toolbar below is necessary:
      ref => https://mui.com/material-ui/react-app-bar/#fixed-placement */}
      <Toolbar sx={{ minHeight: 45 }} />
    </Box>
  );
}

export default Topbar;
