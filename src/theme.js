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
          ":hover": {
            transform: "Scale(1.05)",
            transition: "all 200ms",
          },
        },
      },
    },
  },
  typography: {
    fontSize: 16,
    h1: {
      fontFamily: '"Oswald","Arial",sans-serif',
      fontSize: "6rem", //48px
      lineHeight: "1.3",
      fontWeight: 700, //Bold
      color: "#fff",
      textTransform: "capitalize",
    },
    h2: {
      fontFamily: '"Oswald","Arial",sans-serif',
      fontSize: "4rem", //40px
      fontWeight: 500, //Medium
      color: "#9b9b9b",
      textTransform: "capitalize",
    },
    h3: {
      fontFamily: '"Oswald","Arial",sans-serif',
      fontSize: "3rem", //32px
      lineHeight: "1.3",
      fontWeight: 500, //Medium
      color: "#252525",
      textTransform: "capitalize",
    },
    h4: {
      fontFamily: '"Oswald","Arial",sans-serif',
      fontSize: "1.5rem", //20px
      fontWeight: 400, //Regular
      color: "#252525",
      textTransform: "capitalize",
    },
    h5: {
      fontFamily: '"Oswald","Arial",sans-serif',
      fontSize: "1rem", //16px
      fontWeight: 300, //Light
      color: "#252525",
      textTransform: "capitalize",
    },
    body1: {
      fontFamily: '"Montserrat","Arial",sans-serif',
      fontSize: "1rem", //16px
      fontWeight: 400, //Regular
      color: "#252525",
    },
    button: {
      fontFamily: '"Montserrat","Arial",sans-serif',
      fontSize: "1rem", //24px
      fontWeight: 400, //Regular
      color: "#252525",
      textTransform: "none",
    },
  },
});

export default responsiveFontSizes(theme);
