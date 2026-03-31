import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    // Mirrors the --font-app variable in globals.css
    fontFamily: 'var(--font-app), "Quicksand", sans-serif',
  },
});

export default theme;
