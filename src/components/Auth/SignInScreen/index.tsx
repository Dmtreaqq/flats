import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import useStyles from './styles';
import AuthForm from '../AuthForm';

const SignInScreen: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" component="div" className={classes.title}>
        Login
      </Typography>
      <AuthForm />
      <Box mb="71px" textAlign="center" mt="auto">
        <Typography
          variant="caption"
          display="block"
          className={classes.caption}
        >
          Don&apos;t have an account
        </Typography>
        <Button component={Link} variant="text" to="/register">
          Register
        </Button>
      </Box>
    </>
  );
};

export default SignInScreen;
