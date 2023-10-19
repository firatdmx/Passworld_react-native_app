import { SafeAreaView, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import Biometrics from '../../components/Biometrics/Biometrics.js';
import PinCode from '../../components/PinCode/PinCode.js';
import useBiometrics from '../../hooks/useBiometrics.js';
import BiometricsLockScreen from '../BiometricsLockScreen/BiometricsLockScreen.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Settings = () => {
  const [isBioLoginEnabled, setIsBioLoginEnabled] = useState(false)
  const {isAuthenticated, authenticateWithBiometrics} = useBiometrics()


  const getBioLoginEnabledState = async () => {
    const result = await AsyncStorage.getItem("bioLoginEnabled")
    console.log("result: ",result)
    if (result === "true")
    {
        setIsBioLoginEnabled(true)
    }
    else
    {
        setIsBioLoginEnabled(false)
    }

}

useEffect(() => {
  getBioLoginEnabledState()
  
  return () => {
    getBioLoginEnabledState()
  }
}, [])


  const authenticate = () => {
    if (isAuthenticated) {
      return settingsContent()
    } else {
      authenticateWithBiometrics()
      return <BiometricsLockScreen />
    }
  }

  const settingsContent = () => {
    return(
    <View>
      <PinCode />
      <Biometrics />
    </View>
    )
  }

    
    return (
      <SafeAreaView style={{flex: 1,marginTop:5}}>
        {isBioLoginEnabled ? authenticate() : settingsContent()}
      </SafeAreaView>
    );
}

export default Settings;