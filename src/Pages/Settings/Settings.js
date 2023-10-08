import { SafeAreaView, Text, Switch, View, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from './Settings.styles.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart'; // Import the RNRestart module
import auth from '@react-native-firebase/auth'




const Settings = () => {

    const handleRestartPress = () => {
        RNRestart.Restart();
    };

    const getCurrentUser = () => {
        const user = auth().currentUser;
        if (user) {
          // console.log(user.email); //print active user
        //   setUser(user.email)
          return user.email;
        } else {
          console.log('logged user not found');
          return false;
        }
      };   



    const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);

    useEffect(() => {
        // getCurrentUser()
        getBooleanValue(getCurrentUser()+'_isPasswordEnabled').then((result) => {
        setIsPasswordEnabled(result);
      });
    }, []);
  
    const storeBooleanValue = async (key, value) => {
      try {
        await AsyncStorage.setItem(key, value.toString());
      } catch (error) {
        console.error('ERR:', error);
      }
    };
  
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

    const handleCancel = () => {
        return null
    }

    const confirmRestart = (value) => {
        setIsPasswordEnabled(value);
        storeBooleanValue(getCurrentUser()+'_isPasswordEnabled', value.toString());
        handleRestartPress()
    }
  
    const toggleSwitch = (value) => {
        Alert.alert("Warning", "The app will restart. Are you sure you want to proceed?", 
        [
            {
              text: 'No',
              onPress: handleCancel,
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => confirmRestart(value),
            },
          ], {cancelable: false})
    };


    return (
        <SafeAreaView style={{flex:1}}>
            
            <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',marginTop:15,padding:10}}>
            <Text style={{}}>ASK password?</Text>
                <Switch 
                style={{marginLeft:20, transform: [{ scaleX: 2 }, { scaleY: 2 }]}} 
                onValueChange={toggleSwitch} 
                value={isPasswordEnabled}
                trackColor={{ false: 'gray', true: 'gray' }}
                thumbColor={isPasswordEnabled ? 'green' : 'darkgray'}
                />
            </View>
        </SafeAreaView>
    )
}

export default Settings;