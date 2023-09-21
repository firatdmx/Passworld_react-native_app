import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Orientation from 'react-native-orientation-locker';




import AuthStack from './Navigation/AuthStack';
import DrawerNavigator from './Navigation/DrawerNavigator';

const Router = () => {
    Orientation.lockToPortrait(); // Lock to portrait mode
    const [user, setUser] = useState(auth().currentUser);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((authenticatedUser) => {
          setUser(authenticatedUser);
        });
    
        return unsubscribe;
      }, []);


    return (
        <NavigationContainer>
            {user ? <DrawerNavigator /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Router;