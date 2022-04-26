import { Box, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen: React.FC = () => {
  return (
    <Box display="flex" marginLeft="auto" marginRight="auto" mt="30px">
      <Button component={Link} to="/flats" variant="contained" color="primary">
        Explore Flats
      </Button>
    </Box>
  );
};

export default HomeScreen;
