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
import BiometricsLockScreen from './Pages/BiometricsLockScreen';
import useBiometrics from './hooks/useBiometrics';

const Router = () => {
  const [loading, setLoading] = useState(false)
  const [isPinEnabled, setIsPinEnabled] = useState(false);
  const [isBioLoginEnabled, setIsBioLoginEnabled] = useState(false)
  const [user, setUser] = useState(auth().currentUser);
  const {isAuthenticated, authenticateWithBiometrics} = useBiometrics()


  const getBioLoginEnabledState = async () => {
    const result = await AsyncStorage.getItem("bioLoginEnabled")
    if (result === "true")
    {
        setIsBioLoginEnabled(true)
    }
    else
    {
        setIsBioLoginEnabled(false)
    }

}






  const dispatch = useDispatch()

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      dispatch(setUnlockState(false));
      
    }
  };

  AppState.addEventListener('change', handleAppStateChange);

  const unlockedState = useSelector((state) => state.unlockState.value)




  const getValueFromStorage = async (key) => {
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
      return user.email;
    } else {
      console.log('logged user not found');
      return false;
    }
  }; 


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
    

    useEffect(() => {
      getBioLoginEnabledState()
  
      return () => {
        getBioLoginEnabledState()
      }
    }, [])
  
    useEffect(() => {
      // AsyncStorage.setItem(getCurrentUser() + "_isPinEnabled", "false"); // kaldırrrrrrrrrrrrrrrrrrrrrrrrrrrRRRRR
      getValueFromStorage(getCurrentUser()+'_isPinEnabled')
      .then((result) => {
        setIsPinEnabled(result);
      });
    }, [isPinEnabled]);

    useEffect(() => {
        storeEncryptionKey()
        const unsubscribe = auth().onAuthStateChanged((authenticatedUser) => {
          setUser(authenticatedUser);
        });
    
        return unsubscribe;
      }, []);


      const PasswordScreen = () => {
        if (!unlockedState && isPinEnabled) {
          return <AppPassword />
        }else{
          return <DrawerNavigator />
        }
      }

      const BioLoginScreen = () => {
        if (isAuthenticated) {
          return PasswordScreen()
        } else {
          authenticateWithBiometrics()
          return <BiometricsLockScreen />
        }
      }


      const checkBiometricsAuth = () => {
        if (isBioLoginEnabled) 
        {
          return BioLoginScreen()
        } 
        else 
        {
          return PasswordScreen()
        }
      }


  
// ██████  ███████ ███    ██ ██████  ███████ ██████  
// ██   ██ ██      ████   ██ ██   ██ ██      ██   ██ 
// ██████  █████   ██ ██  ██ ██   ██ █████   ██████  
// ██   ██ ██      ██  ██ ██ ██   ██ ██      ██   ██ 
// ██   ██ ███████ ██   ████ ██████  ███████ ██   ██ 
    return (
        <NavigationContainer>
          {loading && <LoadingSpinner />}
            {user ? checkBiometricsAuth() : <AuthStack />}
        </NavigationContainer>
      )
    }
    
    export default Router;