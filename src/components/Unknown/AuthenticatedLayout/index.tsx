import { Box, Typography } from '@mui/material';
import firebase from 'firebase';
import React, { useState, useContext } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import useStyles from './styles';
import { auth } from '../../../common/firebaseApp';
import clearFirestoreCache from '../../../common/clearFirestoreCache';
import getInitialsFromString from '../../../common/getInitialsFromString';
import { UIContext } from '../UIContext';

interface AuthenticatedLayoutProps {
  children: React.ReactElement;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}: AuthenticatedLayoutProps) => {
  const classes = useStyles();
  const [user, setUser] = useState<firebase.User | null>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { setPaper } = useContext(UIContext);

  auth.onAuthStateChanged((currentUser) => {
    setUser(currentUser);
  });

  const handleLogout = async () => {
    try {
      await auth.signOut();
      clearFirestoreCache();
    } catch (err) {
      setPaper({
        show: true,
        message: err.message,
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
      });
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledEngineProvider injectFirst>
      <Box className={classes.box}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              className={classes.icon}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" component="div">
              Voypost
            </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar>{getInitialsFromString(user?.displayName)}</Avatar>
              </IconButton>
              <Menu
                className={classes.menu}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Container disableGutters className={classes.container} maxWidth="xl">
          {children}
        </Container>
      </Box>
    </StyledEngineProvider>
  );
};

export default AuthenticatedLayout;
