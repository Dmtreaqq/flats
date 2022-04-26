import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import RegisterForm from '../RegisterForm';
import useStyles from './styles';

const RegisterScreen: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" component="div" className={classes.title}>
        Register
      </Typography>
      <RegisterForm />
      <Box mb="71px" textAlign="center" mt="auto">
        <Typography
          variant="caption"
          display="block"
          className={classes.caption}
        >
          Already have account?
        </Typography>
        <Button component={Link} variant="text" to="/login">
          LOGIN
        </Button>
      </Box>
    </>
  );
};

export default RegisterScreen;
