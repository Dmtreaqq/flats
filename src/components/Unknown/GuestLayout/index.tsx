import { Box } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import React from 'react';
import heroImage from '../../Auth/hero.jpg';
import { ReactComponent as Logo } from '../../Auth/logo.svg';

interface GuestLayoutProps {
  children: React.ReactElement;
}

const useStyles = makeStyles({
  heroImage: {
    backgroundImage: `url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  logo: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 100,
  },
});

const GuestLayout: React.FC<GuestLayoutProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <StyledEngineProvider injectFirst>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Container disableGutters maxWidth="xl">
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Box height="100%" className={classes.heroImage} />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box className={classes.logo}>
                  <Logo width="173" height="37" />
                </Box>
                {children}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </StyledEngineProvider>
    </>
  );
};

export default GuestLayout;
