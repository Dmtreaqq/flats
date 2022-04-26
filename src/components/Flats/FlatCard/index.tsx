import React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import useQuery from '../useQuery';
import { FlatCardProps } from '../../../../types';

const FlatCard: React.FC<FlatCardProps> = ({
  id,
  setActiveCard,
  activeCard,
  cityName,
  address,
  dailyPriceUsd,
  description,
  photoUrl,
}) => {
  const classes = useStyles();
  const query = useQuery();

  const city = query.get('city');

  return (
    <Card elevation={activeCard === id ? 1 : 3}>
      <Grid container>
        <Grid item xs={6}>
          <CardMedia
            component="img"
            height="240px"
            image={photoUrl}
            alt="Photo of flat"
          />
        </Grid>
        <Grid item xs={6} display="flex" flexDirection="column">
          <Box>
            <CardContent>
              <Typography variant="h5" component="div">
                ${dailyPriceUsd} / night
              </Typography>
              <Typography className={classes.address} color="text.secondary">
                {`${cityName}: ${address}`}
              </Typography>
              <Typography>{description}</Typography>
            </CardContent>
          </Box>
          <Box display="flex" mt="auto" mb="16px">
            <CardActions className={classes.cardActions} disableSpacing>
              <Button
                className={classes.button}
                onClick={() => setActiveCard(id)}
                component={Link}
                to={city ? `/flats/${id}/?city=${city}` : `/flats/${id}`}
                color="info"
                variant="contained"
                size="small"
              >
                Details
              </Button>
            </CardActions>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default FlatCard;
