import ReactNativeBiometrics from 'react-native-biometrics';
import {BackHandler} from 'react-native';
import { useState, } from 'react';


const useBiometrics = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const rnBiometrics = new ReactNativeBiometrics();

  const authenticateWithBiometrics = async () => {
    rnBiometrics
      .simplePrompt({promptMessage: 'Authentication'})

      .then(resultObject => {
        const {success} = resultObject;
  
        if (success) {
          // console.log('successful biometrics provided');
          setIsAuthenticated(true)
        } else {
          console.log('user cancelled biometric prompt');
          setIsAuthenticated(false)
        }
      })

      .catch((e) => {
        console.log('biometrics failed: ', e.message);
        setIsAuthenticated(false)
      });
    }

    return { isAuthenticated, authenticateWithBiometrics };
  };


  
  export default useBiometrics;
  























  // const rnBiometrics = new ReactNativeBiometrics();
  // rnBiometrics
  //   .simplePrompt({promptMessage: 'Authentication'})
  //   .then(resultObject => {
  //     const {success} = resultObject;

  //     if (success) {
  //       console.log('successful biometrics provided');
  //       setIsAuthenticated(true)
  //     } else {
  //       console.log('user cancelled biometric prompt');
  //       setIsAuthenticated(false)
  //     }
  //   })
  //   .catch(() => {
  //     console.log('biometrics failed');
  //     setIsAuthenticated(false)
  //   });

  //   return { isAuthenticated, authenticateWithBiometrics };