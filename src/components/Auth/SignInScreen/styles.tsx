import { makeStyles } from '@mui/styles';
import heroImage from '../hero.jpg';

export default makeStyles({
  heroImage: {
    backgroundImage: `url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  title: {
    textAlign: 'center',
    marginTop: 38,
    fontWeight: 700,
    lineHeight: '112px',
    letterSpacing: -1.5,
  },
  link: {
    textDecoration: 'none',
  },
  caption: {
    marginTop: 100,
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: -1.5,
  },
});
