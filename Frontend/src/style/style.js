import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const primarytheme = createTheme({
    palette: {
    //   type: "light",
      primary: {
        // Purple and green play nicely together.
        main: '#0288d1',
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#4fc3f7',
      },
      other:{
        black:"#000",
        white:"#fff",
        dark:"#fff",
        logocolor:"#4fc3f7",
        footercolor:"#0288d1",
        footertext:"#fff"
      }
    }
  });

export default primarytheme;