import { createTheme } from "@mui/material/styles";
import { primaryColor } from "@/components/utils/Colors";

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
  },
  typography: {
    // Mirrors the --font-app variable in globals.css
    fontFamily: 'var(--font-app), "Quicksand", sans-serif',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: primaryColor,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: primaryColor,
          },
        },
      },
    },
  },
});

export default theme;
