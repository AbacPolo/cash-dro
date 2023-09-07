import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#252525",
      light: "#464646",
      dark: "#000000",
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
        contained: {
          textTransform: "initial",
        },
      },
    },
  },
  typography: {
    fontSize: 16,
    h1: {
      fontSize: "5rem", //48px
      lineHeight: "1.3",
      fontWeight: 400, //Regular
      color: "#252525",
      textTransform: "capitalize",
    },
    h2: {
      fontSize: "4rem", //40px
      fontWeight: 400, //Regular
      color: "#9b9b9b",
      textTransform: "capitalize",
    },
    h3: {
      fontSize: "3rem", //32px
      lineHeight: "1.3",
      fontWeight: 500, //Regular
      color: "#252525",
      textTransform: "capitalize",
    },
    h4: {
      fontSize: "1.5rem", //20px
      fontWeight: 400, //Regular
      color: "#252525",
      textTransform: "capitalize",
    },
    h5: {
      fontSize: "1rem", //16px
      fontWeight: 500, //Regular
      color: "#252525",
      textTransform: "capitalize",
    },
    body1: {
      fontSize: "1rem", //16px
      fontWeight: 400, //Regular
      color: "#252525",
    },
    button: {
      fontSize: "1rem", //24px
      fontWeight: 400, //Regular
      color: "#252525",
      textTransform: "none"
    },
  },
});

export default responsiveFontSizes(theme);
