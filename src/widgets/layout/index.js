import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
} from "@mui/material";

import Topbar from "./topbar";
import Notify from "./notify";
import HelmetWidget from "./helmet";
import BottomBar from "./bottombar";
import { useTheme } from "hooks";

function withLayout(Comp) {
  function Layout() {
    const [theme, toggleTheme] = useTheme();

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <HelmetWidget />
          <Topbar toggleTheme={toggleTheme} />
          <Container
            sx={{
              flex: 1,
              my: 1,
              maxWidth: "500px !important",
            }}
          >
            <Notify />
            <Comp />
            <Toolbar />
            <BottomBar />
          </Container>
        </Box>
      </ThemeProvider>
    );
  }
  return Layout;
}

export default withLayout;
