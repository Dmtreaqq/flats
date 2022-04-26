import React, { useEffect, useState, useContext } from 'react';
import { Grid, Typography, Box, Container } from '@mui/material';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import GoogleAutocomplete from './GoogleAutocomplete/GoogleAutocomplete';
import FlatCard from '../FlatCard';
import useStyles from './styles';
import useQuery from '../useQuery';
import { db } from '../../../common/firebaseApp';
import { Flat } from '../../../../types/index';
import { UIContext } from '../../Unknown/UIContext';

const FlatsScreen: React.FC = () => {
  const [flats, setFlats] = useState<Flat[]>([]);
  const [activeCard, setActiveCard] = useState<string>('');
  const { setPaper } = useContext(UIContext);
  const classes = useStyles();
  const history = useHistory();
  const query = useQuery();

  const handleSearch = async (city: string | undefined) => {
    const arr: Flat[] = [];
    let cityStr = city;
    if (cityStr) {
      // eslint-disable-next-line prefer-destructuring
      cityStr = cityStr.split(',')[0];
    }

    try {
      let querySnapshot;
      if (cityStr) {
        querySnapshot = await db
          .collection('flats')
          .orderBy('publishedAt')
          .where('cityName', '==', cityStr)
          .limit(20)
          .get();

        history.push(`/flats/?city=${cityStr}`);
      } else {
        querySnapshot = await db
          .collection('flats')
          .orderBy('publishedAt')
          .limit(20)
          .get();
      }

      querySnapshot.forEach((doc) => {
        arr.push({
          id: doc.id,
          address: '',
          latitude: 0,
          longitude: 0,
          cityName: '',
          dailyPriceUsd: 0,
          photoUrl: '',
          publishedAt: new firebase.firestore.Timestamp(0, 0),
          ...doc.data(),
        });
      });

      setFlats(arr);
    } catch (err) {
      setPaper({
        show: true,
        message: err.message,
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
      });
    }
  };

  useEffect(() => {
    const getFlats = async () => {
      const arr: Flat[] = [];

      try {
        const querySnapshot = await db.collection('flats').limit(20).get();

        querySnapshot.forEach((doc) => {
          arr.push({
            id: doc.id,
            address: '',
            latitude: 0,
            longitude: 0,
            cityName: '',
            dailyPriceUsd: 0,
            photoUrl: '',
            publishedAt: new firebase.firestore.Timestamp(0, 0),
            ...doc.data(),
          });
        });
      } catch (err) {
        setPaper({
          show: true,
          message: err.message,
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        });
      }

      setFlats(arr);
    };
    getFlats();
  }, [setPaper]);

  useEffect(() => {
    const city = query.get('city');
    if (city) {
      (async () => {
        handleSearch(city);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container className={classes.container}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Box className={classes.form}>
              <GoogleAutocomplete handleSearch={handleSearch} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography mt="25px" variant="h5" component="h1">
              Flats to rent
            </Typography>
          </Grid>
          {flats.map((flat: Flat) => (
            <Grid key={flat.id} item container xs={12}>
              <Grid item xs={12}>
                <FlatCard
                  id={flat.id}
                  cityName={flat.cityName}
                  address={flat.address}
                  photoUrl={flat.photoUrl}
                  dailyPriceUsd={flat.dailyPriceUsd}
                  description={flat.description}
                  setActiveCard={setActiveCard}
                  activeCard={activeCard}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default FlatsScreen;
