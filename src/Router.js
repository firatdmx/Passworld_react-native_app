import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Orientation from 'react-native-orientation-locker';
import * as Keychain from 'react-native-keychain';
import Config from 'react-native-config';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import AppPassword from './Pages/AppPassword';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'react-native';
import { setUnlockState } from './features/unlockState/unlockStateSlice';
import AuthStack from './Navigation/AuthStack';
import DrawerNavigator from './Navigation/DrawerNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Router = () => {


  const dispatch = useDispatch()

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      dispatch(setUnlockState(false));
    }
  };


  AppState.addEventListener('change', handleAppStateChange);

  const unlockedS = useSelector((state) => state.unlockState.value)
  // console.log("unlockedS: ", unlockedS)

  const [loading, setLoading] = useState(false)

  const [isPinEnabled, setIsPinEnabled] = useState(false);


  const getBooleanValue = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);

      if (value === "true") {
        return value === 'true';
      } else {
        return false;
      }
    } catch (error) {
      console.error('ERR:', error);
      return false;
    }
  };

  const getCurrentUser = () => {
    const user = auth().currentUser;
    if (user) {
      // console.log(user.email); //print active user
      setUser(user.email)
      return user.email;
    } else {
      console.log('logged user not found');
      return false;
    }
  }; 

  useEffect(() => {
    getBooleanValue(getCurrentUser()+'_isPasswordEnabled').then((result) => {
      setIsPinEnabled(result);
    });
  }, [isPinEnabled]);




  const storeEncryptionKey = async () => {
    setLoading(true)
    const username = 'specialEncryptionKey';
    const password = Config.MY_VERY_SECRET_KEY
  
    try {
      await Keychain.setGenericPassword(username, password, {service: "SPECIAL"});
      setLoading(false)
      // console.log('Encryption key stored securely.');
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

      const isUserLoggedIn = () => {
        if (user) {
          return <DrawerNavigator />
        } else {
          return <AuthStack />
        }
      }

  

    return (
        <NavigationContainer>
          {loading && <LoadingSpinner />}
            {!unlockedS && isPinEnabled && user  ? <AppPassword /> : isUserLoggedIn()}
        </NavigationContainer>
      )
    }
    
    export default Router;
    
    
    
    // {/* {user ? <DrawerNavigator /> : <AuthStack />} */}