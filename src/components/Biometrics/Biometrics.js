import { View, Text, Switch } from 'react-native'
import React, {useEffect, useState} from 'react'
import styles from './Biometrics.styles.js'
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import SettingsContainer from '../SettingsContainer/SettingsContainer.js'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Biometrics = () => {
    const [data, setData] = useState("")
    const rnBiometrics = new ReactNativeBiometrics()

    const checkSensorAvailability = async () => {
        rnBiometrics.isSensorAvailable()
          .then((resultObject) => {
            const { available, biometryType } = resultObject

            // if (available) {
            //     createKeys()
            // }
        
            if (available && biometryType === BiometryTypes.TouchID) {
                setData('TouchID is supported')
                // console.log('TouchID is supported')
            } else if (available && biometryType === BiometryTypes.FaceID) {
                setData('FaceID is supported')
                // console.log('FaceID is supported')
            } else if (available && biometryType === BiometryTypes.Biometrics) {
                setData('Biometrics is supported')
                // console.log('Biometrics is supported')
            } else {
                setData('Biometrics not supported')
                // console.log('Biometrics not supported')
            }
          })
    }

    const toggleSwitch = () => {

        if(isBioLoginEnabled)
        {
            AsyncStorage.setItem("bioLoginEnabled", "false")
            setIsBioLoginEnabled("false")
        }
        else
        {
            AsyncStorage.setItem("bioLoginEnabled", "true")
            setIsBioLoginEnabled("true")
        }
        getBioLoginEnabledState()

    }


    const [isBioLoginEnabled, setIsBioLoginEnabled] = useState("false")
    
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
    


    useEffect(() => {
        getBioLoginEnabledState()
    
    }, [isBioLoginEnabled])
    


    useEffect(() => {
        checkSensorAvailability()
        
        return () => {
            checkSensorAvailability()
        }
    }, [])

    const settingsContent = ()=> {
        return(
            <View>
                {data && (
                        <View style={{justifyContent:'center',}}>
                            <Text style={{color:'red',fontWeight:'bold'}}> {data}</Text>
                            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',padding:5}}>
                                <Text>Use Biometrics:</Text>
                                <Switch
                                    onValueChange={toggleSwitch}
                                    value={isBioLoginEnabled}
                                    trackColor={{false: 'gray', true: 'gray'}}
                                    thumbColor={isBioLoginEnabled ? 'green' : 'darkgray'}
                                />
                            </View>
                        </View>
                )}
            </View>
        )
    }
    
//MAIN RETURN
    return (
        <View>
           <SettingsContainer title={"Biometrics"}  content={settingsContent()}/>
        </View>
    )
}

export default Biometrics;