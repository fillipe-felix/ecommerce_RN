import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SingIn from '../pages/SignIn';
import SingUp from '../pages/SignOut';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
    initialRouteName="SignIn"
  >
    <Auth.Screen name="SignIn" component={SingIn} />
    <Auth.Screen name="SignUp" component={SingUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
