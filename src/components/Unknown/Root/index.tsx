import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useUser } from 'reactfire';
import AuthenticatedLayout from '../AuthenticatedLayout';
import GuestLayout from '../GuestLayout';
import HomeScreen from '../HomeScreen';
import NotFoundScreen from '../NotFoundScreen';
import SignInScreen from '../../Auth/SignInScreen';
import RegisterScreen from '../../Registration/RegisterScreen';
import FlatsScreen from '../../Flats/FlatsScreen';
import FlatDetailsPage from '../../Flats/FlatDetailsPage';

const Root: React.FC = () => {
  const {
    data: user,
    // hasEmitted,
    firstValuePromise,
  } = useUser();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const isLogged = !!user;
  useEffect(() => {
    firstValuePromise.then(() => setIsUserLoaded(true));
  }, [firstValuePromise, setIsUserLoaded]);

  // doesn't always work, but suddenly works when subscribing to `firstValuePromise`
  // thus we use `isUserLoaded` below
  // if (!hasEmitted) {
  //   return null;
  // }
  if (!isUserLoaded) {
    return null;
  }

  if (isLogged) {
    return (
      <AuthenticatedLayout>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/login" component={() => <Redirect to="/" />} />
          <Route exact path="/register" component={() => <Redirect to="/" />} />
          <Route path="/flats">
            <FlatsScreen />
            <Switch>
              <Route exact path="/flats" component={FlatDetailsPage} />
              <Route path="/flats/:id" component={FlatDetailsPage} />
              <Route path="/flats/?city=:searchcity" component={FlatsScreen} />
            </Switch>
          </Route>
          <Route path="*" component={NotFoundScreen} />
        </Switch>
      </AuthenticatedLayout>
    );
  }

  return (
    <GuestLayout>
      <Switch>
        <Route exact path="/login" component={SignInScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/" component={() => <Redirect to="/login" />} />
        <Route path="/flats" component={() => <Redirect to="/login" />} />
        <Route path="*" component={NotFoundScreen} />
      </Switch>
    </GuestLayout>
  );
};

export default Root;
