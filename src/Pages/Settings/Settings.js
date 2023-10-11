import { SafeAreaView, Text, Switch, View, Alert,TextInput,TouchableOpacity, Button, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from './Settings.styles.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart'; // Import the RNRestart module
import auth from '@react-native-firebase/auth'
import * as Keychain from 'react-native-keychain'; //pin için
import Modal from 'react-native-modal';



const Settings = () => {
  const [isPinSet, setIsPinSet] = useState(false);
  const [isPinLoginEnabled, setIsPinLoginEnabled] = useState(false);
  const [isSetPinModalVisible, setIsSetPinModalVisible] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [user, setUser] = useState("")


  useEffect(() => {
    getCurrentUser()

  }, [])

  const restartApp = () => {
    RNRestart.Restart()
  }

  

  const getPin = async () => {
    const servis = user + "_pinCode"
    // console.log("servis", servis)
    try {
      const credentials = await Keychain.getGenericPassword({service: servis});
      if (credentials) {
        const pinCode = credentials.password
        // console.log('Retrieved PIN SETTINGS.js:', pinCode);
        setIsPinSet(true)
        return pinCode;
      } else {
        // handleSetNewPin()
        setIsPinSet(false)
        console.log('No PIN found.');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving PIN:', error);
      return null;
    }
  };

  const deletePin = async () => {
    const servis = user + "_pinCode"
    // console.log("servis", servis)
    try {
      await Keychain.resetGenericPassword({service: servis})
      .then(() => {
        setIsPinSet(false)
        setIsPinLoginEnabled(false)
        resetEn()
        Alert.alert("Warning", "The app will be restarted", [
          {
          text: "OK",
          onPress: restartApp,
          style:"cancel"
        }, 
      ],{cancelable:false})
        
      });
  
    } catch (error) {
      console.error('Error resett PIN:', error);
      return null;
    }
  };
  

  
  

  const savePin = async () => {
    const servis = user + "_pinCode"
    // console.log("servis",servis)
    try {
      await Keychain.setGenericPassword('pin', newPin, {service: servis})
      .then(() => 
      {
        // console.log('PIN saved successfully.', newPin),
        setIsPinLoginEnabled(!isPinLoginEnabled) //yeni ekledim toggledaydi
        setIsPinSet(true)
        setPinAlert()
      }
      )
      
      
    } catch (error) {
      console.error('Error saving PIN:', error);
    }
  };


    const getCurrentUser = () => {
        const user = auth().currentUser;
        if (user) {
          setUser(user.email)
          return user.email;
        } else {
          console.log('logged user not found');
          return false;
        }
      };   

      

    useEffect(() => {
      if (user) {
        getPin()
        getIsPinEnabled(user +'_isPinEnabled')
        .then((result) => {
          // console.log("getIsPinEnabled result", result)
          if (result == "true") {
            setIsPinLoginEnabled(true);
          } else {
            setIsPinLoginEnabled(false)
          }
      });
      }

    }, [user]);
  
    const storeIsPinEnabled = async (key, value) => {
      try {
        // console.log("storeit ", key, value)
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.error('ERR:', error);
      }
    };
  
    const getIsPinEnabled = async (key) => {
      try {
        const value = await AsyncStorage.getItem(key);
        // console.log("getIsPinEnabled funct value", value)
        if (value === "true") {
          return 'true';
        } else {
          return "false";
        }
      } catch (error) {
        console.error('ERR:', error);
        return false;
      }
    };

    const handleCancel = () => {
      setIsSetPinModalVisible(false)
      // setIsPinLoginEnabled(false)
    }


    const setPinAlert = () => {
      return(
        Alert.alert("Warning", "The app will restart. Are you sure you want to proceed?", 
        [
            {
              text: 'No',
              onPress: handleCancel,
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: restartApp,
            },
          ], {cancelable: false})
      )
    }

    const resetEn = () => {
      AsyncStorage.setItem(user + "_isPinEnabled", "false");
      // AsyncStorage.setItem("dev2@dev.com_isPinEnabled", "false"); // kaldırrrrrrr
      console.log("RESETTED dev")
    }


  
    const toggleSwitch = () => {
      const key = user +'_isPinEnabled'

      // setIsPinLoginEnabled(!isPinLoginEnabled)
      let enabled = !isPinLoginEnabled
      if (enabled) {
        storeIsPinEnabled(key, "true");
        // console.log("isPinSet: ", isPinSet)
        
        if(isPinSet) {
          setPinAlert()
        }
        else {
          setIsSetPinModalVisible(true)
        }

      } else {
        storeIsPinEnabled(key, "false");
        setPinAlert()
      }
      
    };
    
// ██████  ███████ ███    ██ ██████  ███████ ██████  
// ██   ██ ██      ████   ██ ██   ██ ██      ██   ██ 
// ██████  █████   ██ ██  ██ ██   ██ █████   ██████  
// ██   ██ ██      ██  ██ ██ ██   ██ ██      ██   ██ 
// ██   ██ ███████ ██   ████ ██████  ███████ ██   ██ 
    return (
      <SafeAreaView style={{flex: 1}}>
        <View>
          <Text style={{marginLeft:30,fontSize:15,fontWeight:'400',color:'gray',marginTop:10}}>PIN CODE</Text>
        </View>
        <View style={{backgroundColor:'white',padding:5,margin:15,marginTop:5,borderRadius:10}}>
          <View style={{ flexDirection: 'row',justifyContent: 'space-between',alignItems: 'flex-start', padding: 5,}}>
            <Text style={{}}>Pin Code Enabled</Text>
            <Switch
              style={{marginLeft: 20, transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
              onValueChange={toggleSwitch}
              value={isPinLoginEnabled}
              trackColor={{false: 'gray', true: 'gray'}}
              thumbColor={isPinLoginEnabled ? 'green' : 'darkgray'}
            />
          </View>

{isPinSet && 
<View>
  <View style={{borderTopWidth:1,borderTopColor:"#aaaaaa50",marginHorizontal:5}} />
          <View style={{margin:5,marginVertical:10}}>
            <Pressable disabled={!isPinSet} onPress={() => setIsSetPinModalVisible(true)}>
              <Text style={isPinSet ? {color:'blue'} : {color:'gray'} }>Modify Pin Code</Text>
            </Pressable>
          </View> 
  </View>
}

 {isPinLoginEnabled && 
 <View>
   <View style={{borderTopWidth:1,borderTopColor:"#aaaaaa50",marginHorizontal:5}} />
          <View style={{margin:5,marginVertical:10}}>
            <Pressable disabled={!isPinLoginEnabled} onPress={deletePin}>
              <Text style={isPinLoginEnabled ? {color:'red'} : {color:'gray'} }>Disable Pin Code</Text>
            </Pressable>
          </View> 
 </View>
}

        </View>


        <View>
          <Text style={{marginLeft:30,fontSize:15,fontWeight:'400',color:'gray'}}>OTHERS</Text>
        </View>
        <View style={{backgroundColor:'white',padding:5,margin:15,marginTop:5,borderRadius:10}}>
          <Text>Will be added later...</Text>
          {/* <Button title="print" color={'darkgrey'} onPress={() => console.log('isPinLoginEnabled', isPinLoginEnabled)}/> */}
        </View>


{/*
███    ███  ██████  ██████   █████  ██      
████  ████ ██    ██ ██   ██ ██   ██ ██      
██ ████ ██ ██    ██ ██   ██ ███████ ██      
██  ██  ██ ██    ██ ██   ██ ██   ██ ██      
██      ██  ██████  ██████  ██   ██ ███████ 
*/}
        <Modal
          isVisible={isSetPinModalVisible}
          statusBarTranslucent={false}
          onBackButtonPress={handleCancel}
          onBackdropPress={handleCancel}
          animationType="slide"
          backdropOpacity={0.5}
          transparent={true}
          hardwareAccelerated
          // onShow={{}}
        >
          <View
            style={{
              alignSelf: 'center',
              width: 200,
              height: 150,
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              backgroundColor: 'white',
            }}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              Set Pin Code
            </Text>

            <TextInput
              returnKeyType="done"
              accessible={true}
              accessibilityLabel="Input Pin"
              // ref={pinRef}
              style={{
                borderWidth: 1,
                margin: 5,
                borderRadius: 20,
                paddingLeft: 10,
              }}
              placeholder="Enter new pin..."
              value={newPin}
              onChangeText={setNewPin}
              // onSubmitEditing={}
            />

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity
                style={{backgroundColor: 'red', padding: 10, borderRadius: 10}}
                onPress={handleCancel}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: 'green',
                  padding: 10,
                  borderRadius: 10,
                }}
                onPress={savePin}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
}

export default Settings;