import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#F50057',
    },
    secondary: {
      main: '#BDBDBD',
    },
    info: {
      main: 'rgba(245, 0, 87, 0.08)',
    },
    success: {
      main: '#323232',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
  },
  spacing: [0, 8, 14, 16, 25, 38, 50],
});

export default defaultTheme;
