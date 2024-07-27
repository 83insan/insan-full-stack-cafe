import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#008000", 
    },
    secondary: {
      main : "#0000FF",  
    },
    error: {
      main: "#d32f2f",
    },
  },
  typography: {
    fontFamily: "Montserrat, Arial, Lato", 
    h1: {
      fontSize: "2.7rem",
      fontWeight: "bold",
      marginBottom: "1.3rem",
      textShadow: "0.3em 0.3em 0.17em #008000",
    },
    h2: {
      fontSize: "1.9rem",
      fontWeight: "bold",
      marginBottom: "0.65rem",
    },
    h3: {
      fontSize: "1.7rem",
      fontWeight: "bold",
      marginBottom: "0.7rem",
    },
    h4: {
      fontSize: "1.27rem",
      fontWeight: "bold",
      marginBottom: "0.27rem",
    },
    h5: {
      fontSize: "1.3rem",
      fontWeight: "bold",
      marginBottom: "0.27rem",
    },
    h6: {
      fontSize: "1.1rem",
      fontWeight: "bold",
      marginBottom: "0.27rem",
    },
  },
});

export default theme;
