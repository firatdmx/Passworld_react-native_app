import { SafeAreaView, View} from 'react-native'
import React, {useEffect} from 'react'
import Biometrics from '../../components/Biometrics/Biometrics.js';
import PinCode from '../../components/PinCode/PinCode.js';
import useBiometrics from '../../hooks/useBiometrics.js';
import BiometricsLockScreen from '../BiometricsLockScreen/BiometricsLockScreen.js';



const Settings = () => {
  const {isAuthenticated, authenticateWithBiometrics} = useBiometrics()

  useEffect(() => {
      if (!isAuthenticated) {
        authenticateWithBiometrics();
      }
    }, []);

    
    return (
      <SafeAreaView style={{flex: 1,marginTop:5}}>
        {!isAuthenticated ?  <BiometricsLockScreen /> :
        (<View>
          <PinCode />
          <Biometrics />
        </View>
        )
    }
      </SafeAreaView>
    );
}

export default Settings;