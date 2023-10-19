import { SafeAreaView, Text } from 'react-native'
import React from 'react'
import styles from './BiometricsLockScreen.styles.js'


const BiometricsLockScreen = () => {
    return (
        <SafeAreaView style={{flex:1}}>
            <Text style={{fontSize:50, textAlign:'center',marginTop:'30%'}}>APP LOCKED!</Text>
        </SafeAreaView>
    )
}

export default BiometricsLockScreen;
