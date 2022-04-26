import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  container: {
    position: 'relative',
    paddingLeft: 10,
    paddingRight: 10,
  },
  googleMap: {
    position: 'fixed',
    right: 0,
    width: '50vw',
    height: '100vh',
  },
}));
