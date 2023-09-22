import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Orientation from 'react-native-orientation-locker';
import * as Keychain from 'react-native-keychain';
import Config from 'react-native-config';

import AuthStack from './Navigation/AuthStack';
import DrawerNavigator from './Navigation/DrawerNavigator';

const Router = () => {

  const storeEncryptionKey = async () => {
  const username = 'specialEncryptionKey';
  const password = Config.MY_VERY_SECRET_KEY
  
    try {
      await Keychain.setGenericPassword(username, password);
      console.log('Encryption key stored securely.');
    } catch (error) {
      console.error('Error storing encryption key:', error);
    }
  };


    Orientation.lockToPortrait(); // Lock to portrait mode
    const [user, setUser] = useState(auth().currentUser);

    useEffect(() => {
        storeEncryptionKey()
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