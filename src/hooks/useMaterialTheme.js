import "@fontsource/mukta";
import { useState } from "react";
import { createTheme } from "@mui/material";

function useMaterialTheme() {
  const [dark, setDark] = useState(true);

  const theme = createTheme({
    palette: {
      mode: dark ? "dark" : "light",
    },
    typography: {
      fontFamily: ["Mukta", "sans-serif"].join(","),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            minWidth: "120px",
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          },
        },
      },
    },
  });

  const toggleTheme = () => {
    setDark((prev) => !prev);
  };

  return [theme, toggleTheme];
}

export default useMaterialTheme;
