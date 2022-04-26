import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GoogleMap from './GoogleMap';
import useStyles from './styles';
import { db } from '../../../common/firebaseApp';

const FlatDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState<string>('No flat selected');
  const [loading, setLoading] = useState<boolean>(false);
  const classes = useStyles();
  const [position, setPosition] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    const getFlatById = async (num: string) => {
      try {
        setLoading(true);
        setTitle('Loading flat details');
        const query = await db.collection('flats').doc(num).get();
        if (query.exists) {
          setLoading(false);
          const doc = { ...query.data() };
          if (doc && doc.latitude && doc.longitude) {
            setPosition({ lat: +doc.latitude, lng: +doc.longitude });
          } else {
            setLoading(false);
            setTitle('Failed to load the flat');
          }
        }
      } catch (err) {
        setTitle('Failed to load the flat');
        throw new Error(err.message);
      }
    };
    if (id) {
      getFlatById(id);
    }
  }, [id]);

  return (
    <Grid className={classes.container} container flex={1.3}>
      <Grid item xs={12}>
        <Box className={classes.googleMap}>
          <GoogleMap position={position} title={title} loading={loading} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default FlatDetailsPage;
