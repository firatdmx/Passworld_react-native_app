import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import AuthStack from './Navigation/AuthStack';
import AppStack from './Navigation/AppStack'

const Router = () => {
    const [user, setUser] = useState(auth().currentUser);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((authenticatedUser) => {
          setUser(authenticatedUser);
        });
    
        return unsubscribe;
      }, []);


    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Router;