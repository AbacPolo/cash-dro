import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#42a5f5",
      light: "#8BC7F9",
      dark: "#1976d2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fff",
      dark: "#c5a47e",
      contrastText: "#252525",
    },
    button: {
      main: "#c5a47e",
      dark: "#cc9f6b",
      contrastText: "#252525",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {},
      },
    },
  },
  typography: {
    fontSize: 16,
    h1: {
      fontSize: "5rem", //48px
      lineHeight: "1.3",
      fontWeight: 400, //Regular
      color: "#fff",
      letterSpacing: "0px",
      fontFamily: '"Bree Serif", "Arial", sans-serif',
    },
    h2: {
      fontSize: "4rem", //40px
      fontWeight: 400, //Regular
      color: "#fff",
      fontFamily: '"Bree Serif", "Arial", sans-serif',
    },
    h3: {
      fontSize: "3rem", //32px
      fontWeight: 400, //Regular
      color: "#8F8F8F",
      fontFamily: '"Bree Serif", "Arial", sans-serif',
    },
    h4: {
      fontSize: "1.5rem", //20px
      fontWeight: 400, //Regular
      color: "#8F8F8F",
      fontFamily: '"Bree Serif", "Arial", sans-serif',
    },
    body1: {
      fontSize: "1rem", //16px
      fontFamily: '"Noto Sans", "Arial", sans-serif',
      fontWeight: 400, //Regular
      color: "#252525",
    },
    button: {
      fontSize: "2rem", //24px
      fontWeight: 400, //Regular
      color: "#fff",
      fontFamily: '"Bree Serif", "Arial", sans-serif',
    },
  },
});

export default responsiveFontSizes(theme);
