import { View, Text, TextInput, TouchableHighlight,AppState, Alert, } from 'react-native'
import React, {useState,useEffect,useRef} from 'react'
import * as Keychain from 'react-native-keychain'; //pin için
import styles from './AppPassword.styles.js'
import { useDispatch } from 'react-redux';
import { setUnlockState } from '../../features/unlockState/unlockStateSlice.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context'
import { showMessage } from "react-native-flash-message";
import auth from '@react-native-firebase/auth'


const AppPassword = () => {
    const dispatch = useDispatch();
    
    const [pins, setPins] = useState("")
    const [passVal, setPassVal] = useState("")
    
    
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
    

    const getPin = async () => {
        try {
          const credentials = await Keychain.getGenericPassword({service: getCurrentUser() + "_pinCode"});
          if (credentials) {
            setPins(credentials.password)
            // console.log('Retrieved PIN AppPassword.js:', pins);
            console.log("AppPassword password: ", credentials.password)
            return pins;
          } else {
            console.log('No PIN found.');
            return null;
          }
        } catch (error) {
          console.error('Error retrieving PIN:', error);
          return null;
        }
      };


    useEffect(() => {
        setPassVal("")
        getPin()
        dispatch(setUnlockState(false))
    }, [])

    const appState = useRef(AppState.currentState);
  
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // console.log('App has come to the foreground!');
        setPassVal("")
      }

      setPassVal("")
      appState.current = nextAppState;
    //   console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);


    useEffect(() => {
        if(pins != 0 && passVal.length == pins.length) {
          if(passVal === pins) {
            dispatch(setUnlockState(true))
          }
          else {
            showErrorMessage()
            setPassVal("")
            dispatch(setUnlockState(false))
                }
        }

    }, [passVal])


    const handleSetPass = (val) => {
      // console.log("handlesetpass: ", pins.length)
        if (passVal.length < pins.length) {
            setPassVal(val)
        }
    }
    const showErrorMessage = () => {
        showMessage({
          message: 'Error!',
          description: 'Wrong pin',
          type: 'danger',
        });
      };

      const handleLogOut = () => {
        auth().signOut()
                    .then(res => {
                        console.log('successfully logged out: ', res)
                    }) 
                    .catch(err => console.log('logout hata olustu: ', err))
      }

// ██████  ███████ ███    ██ ██████  ███████ ██████  
// ██   ██ ██      ████   ██ ██   ██ ██      ██   ██ 
// ██████  █████   ██ ██  ██ ██   ██ █████   ██████  
// ██   ██ ██      ██  ██ ██ ██   ██ ██      ██   ██ 
// ██   ██ ███████ ██   ████ ██████  ███████ ██   ██ 
    return (
        <SafeAreaView style={{flex:1}}>
            <LinearGradient colors={['#000000', '#ff0000', '#aaaa00']} style={[{flex:1},styles.linearGradient]}>
            <View style={{flex:1,justifyContent:'flex-end',alignItems:'center',}}>
                <Text style={{marginTop:0,fontSize:35, textAlign:'center',color:'white',fontWeight:'bold'}}>PasswordVault{'\n'}is locked!</Text>
                <TextInput 
                    maxLength={6} 
                    style={{backgroundColor:'white', width:370, margin:10,borderRadius:10,paddingLeft:10,fontSize:20,color:'black'}} 
                    value={passVal} 
                    onChangeText={setPassVal} 
                    placeholder='Enter your pin... '
                    placeholderTextColor={'gray'}
                    secureTextEntry={true}
                    editable={false}
                    />
            </View>
            
        <View style={{flex:1,backgroundColor:'transparent',margin:10}}>

        <View style={{flex:1,flexDirection:"row", justifyContent:'space-between', alignItems:'space-between'}}>
            <TouchableHighlight underlayColor={"transparent"} style={{flex:1,margin:5,backgroundColor:'white',justifyContent:'center',alignItems:"center",borderRadius:6}} onPress={() => handleSetPass(passVal + "1")}>
            <View style={{flex:1, justifyContent:'center'}}>
                <Text style={{fontSize:60, color:'black'}}>1</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={"transparent"} style={{flex:1,margin:5,backgroundColor:'white',justifyContent:'center',alignItems:"center",borderRadius:6}} onPress={() => handleSetPass(passVal + "2")}>
            <View style={{flex:1, justifyContent:'center'}}>
                <Text style={{fontSize:60, color:'black'}}>2</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={"transparent"} style={{flex:1,margin:5,backgroundColor:'white',justifyContent:'center',alignItems:"center",borderRadius:6}} onPress={() => handleSetPass(passVal + "3")}>
            <View style={{flex:1, justifyContent:'center'}}>
                <Text style={{fontSize:60, color:'black'}}>3</Text>
                </View>
            </TouchableHighlight>
        </View>

        <View style={{flex:1,flexDirection:"row", justifyContent:'space-between', alignItems:'space-between'}}>
            <TouchableHighlight underlayColor={"transparent"} style={{flex:1,margin:5,backgroundColor:'white',justifyContent:'center',alignItems:"center",borderRadius:6}} onPress={() => handleSetPass(passVal + "4")}>
            <View style={{flex:1, justifyContent:'center'}}>
                <Text style={{fontSize:60, color:'black'}}>4</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={"transparent"} style={{flex:1,margin:5,backgroundColor:'white',justifyContent:'center',alignItems:"center",borderRadius:6}} onPress={() => handleSetPass(passVal + "5")}>
            <View style={{flex:1, justifyContent:'center'}}>
                <Text style={{fontSize:60, color:'black'}}>5</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={"transparent"} style={{flex:1,margin:5,backgroundColor:'white',justifyContent:'center',alignItems:"center",borderRadius:6}} onPress={() => handleSetPass(passVal + "6")}>
            <View style={{flex:1, justifyContent:'center'}}>
                <Text style={{fontSize:60, color:'black'}}>6</Text>
                </View>
            </TouchableHighlight>
        </View>

        <View style={{flex:1,flexDirection:"row", justifyContent:'space-between', alignItems:'space-between'}}>
            <TouchableHighlight underlayColor={"transparent"} style={{flex:1,margin:5,backgroundColor:'white',justifyContent:'center',alignItems:"center",borderRadius:6}} onPress={() => handleSetPass(passVal + "7")}>
            <View style={{flex:1, justifyContent:'center'}}>
                <Text style={{fontSize:60, color:'black'}}>7</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={"transparent"} style={{flex:1,margin:5,backgroundColor:'white',justifyContent:'center',alignItems:"center",borderRadius:6}} onPress={() => handleSetPass(passVal + "8")}>
            <View style={{flex:1, justifyContent:'center'}}>
                <Text style={{fontSize:60, color:'black'}}>8</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={"transparent"} style={{flex:1,margin:5,backgroundColor:'white',justifyContent:'center',alignItems:"center",borderRadius:6}} onPress={() => handleSetPass(passVal + "9")}>
                <View style={{flex:1, justifyContent:'center'}}>
                    <Text style={{fontSize:60, color:'black'}}>9</Text>
                </View>
            </TouchableHighlight>
        </View>

        <View style={{flex:1,flexDirection:"row", justifyContent:'space-between', alignItems:'space-between'}}>
            <TouchableHighlight underlayColor={"transparent"} style={{flex:1,margin:5,backgroundColor:'white',justifyContent:'center',alignItems:"center",borderRadius:6}} onPress={handleLogOut}>
                <View style={{flex:1, justifyContent:'center'}}>
                        <Icon name={"logout"} color={'gray'} size={60} />
                    </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={"transparent"} style={{flex:1,margin:5,backgroundColor:'white',justifyContent:'center',alignItems:"center",borderRadius:6}} onPress={() => handleSetPass(passVal + "0")}>
            <View style={{flex:1, justifyContent:'center'}}>
                    <Text style={{fontSize:60, color:'black'}}>0</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={"transparent"} style={{flex:1,margin:5,backgroundColor:'white',justifyContent:'center',alignItems:"center",borderRadius:6}} onPress={() => setPassVal(passVal.substring(0, passVal.length -1))}>
                    <View style={{flex:1, justifyContent:'center'}}>
                        <Icon  name={"backspace"} color={'gray'} size={60} />
                    </View>
            </TouchableHighlight>
        </View>

    </View>
    


        </LinearGradient>
    </SafeAreaView>
    )
}

export default AppPassword;