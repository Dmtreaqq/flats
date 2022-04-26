import React, { createContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Snackbar, SnackbarOrigin } from '@mui/material';
import useStyles from './styles';

export const UIContext = createContext<UIContextProps>({} as UIContextProps);

interface UIContextProps {
  setPaper: React.Dispatch<React.SetStateAction<PaperProps>>;
}

interface PaperProps {
  show: boolean;
  message?: string;
  anchorOrigin?: SnackbarOrigin;
}

export const UIContextProvider: React.FC = ({ children }) => {
  const [paper, setPaper] = useState<PaperProps>({
    show: false,
    message: '',
    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
  });

  const handleClose = () => setPaper({ show: false });
  const classes = useStyles();

  return (
    <UIContext.Provider value={{ setPaper }}>
      {children}
      <Snackbar
        anchorOrigin={paper.anchorOrigin}
        open={paper.show}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Paper className={classes.paper} elevation={6} variant="elevation">
          {paper.message}
        </Paper>
      </Snackbar>
    </UIContext.Provider>
  );
};
