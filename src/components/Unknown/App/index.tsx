import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';
import { Theme } from '@mui/material/styles';
import firebaseApp from '../../../common/firebaseApp';
import theme from '../../../common/theme';
import Root from '../Root';
import { UIContextProvider } from '../UIContext';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const App: React.FC = () => {
  return (
    <FirebaseAppProvider firebaseApp={firebaseApp}>
      <ThemeProvider theme={theme}>
        <Router basename={process.env.PUBLIC_URL || '/'}>
          <CssBaseline />
          <UIContextProvider>
            <Root />
          </UIContextProvider>
        </Router>
      </ThemeProvider>
    </FirebaseAppProvider>
  );
};

export default App;
