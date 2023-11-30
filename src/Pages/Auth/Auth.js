import { Text, View, TextInput, Pressable,KeyboardAvoidingView } from 'react-native'
import React,{useState} from 'react'
import styles from './Auth.styles.js'
import auth from '@react-native-firebase/auth'
import AuthButton from '../../components/AuthButton';
import {setUserInfo} from '../../features/userInfo/userInfoSlice';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.js';
import firestore from '@react-native-firebase/firestore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import authErrorMessageParser from '../../utils/authErrorMessageParser.js';
import { showMessage } from "react-native-flash-message";


const Auth = () => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false)
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  const showErrorMessage = (info, messageText) => {
    showMessage({
      message: info,
      description: messageText,
      type: 'danger',
    });
  };

  const mailpassExist = () => {
      if (mail && pass) {
        return true;
      } else{
        showErrorMessage("Error", "Mail or Password fields cannot be empty!")
        setLoading(false)
        return false;
      }
    }
    
    const signUp = () => {
      setLoading(true)
      if(mailpassExist()) {
        auth().createUserWithEmailAndPassword(mail, pass) 
        .then(res => {
          showErrorMessage("Info", "Signup Successfull!")
          setLoading(false)
        })
        .catch(error => {
          console.log("hataaaaaaa ", error.code )
          showErrorMessage("Error", authErrorMessageParser(error.code))
          setLoading(false)
        })  
      }
      }

    const resetPW = () => {
      setLoading(true)
      if(mail) {
        auth().sendPasswordResetEmail(mail)
        .then(r => {
          console.log("Password Reset: ", r)
          setLoading(false)
        })
        .catch(e => {
          console.log(e)
          setLoading(false)
        })
      } else {
        showMessage("Error","Mail does not exist.")
        setLoading(false)
      }
    }
      
      
  const signIn = () => {
    setLoading(true)
    if(mailpassExist()) {
      auth().signInWithEmailAndPassword(mail, pass) 
      .then(res =>  {
        setLoading(false)
        setUserInfo(res)
        checkUserDocument()
      })
      .catch(error => {
        // console.log("LOGIN ERROR: ", error)
        showErrorMessage("Error", authErrorMessageParser(error.code))
        setLoading(false)
      })  
        }
      }

  const checkUserDocument = async () => {
    const userMail =  getCurrentUser()
    console.log(userMail)
    const userXget = await firestore().collection('users').doc(userMail).get();
    const userX = firestore().collection('users').doc(userMail);
    if (userXget.exists) {
      // console.log("user EXISTS")
    } else {
      userX.set({})
      // console.log("USER DOES NOT EXIST- WORKED")
    }
  }
  const getCurrentUser = () => {
    const user = auth().currentUser;
    if (user) {
      return user.email;
    } else {
      // console.log('logged user not found');
      return null;
    }
  };

   
// ██████  ███████ ███    ██ ██████  ███████ ██████  
// ██   ██ ██      ████   ██ ██   ██ ██      ██   ██ 
// ██████  █████   ██ ██  ██ ██   ██ █████   ██████  
// ██   ██ ██      ██  ██ ██ ██   ██ ██      ██   ██ 
// ██   ██ ███████ ██   ████ ██████  ███████ ██   ██ 
    return (
      <View style={{flex:1,padding:20,marginTop: insets.top,marginBottom:insets.bottom,marginLeft:insets.left,marginRight:insets.right}}>
        {loading ? <LoadingSpinner msg={"Please Wait..."} /> : (

      <KeyboardAvoidingView style={styles.main}>
        <View style={styles.secondMain}>
          <Text style={styles.slogan}>
            Your Pass World!
          </Text>

          <View style={styles.textinpRows}>
            <Text style={styles.rowLabel}>E-Mail: </Text>
            <TextInput
              placeholder="Enter your e-mail address"
              placeholderTextColor={"gray"}
              value={mail}
              onChangeText={setMail}
              style={styles.textinp}
              />
          </View>

          <View style={styles.textinpRows}>
            <Text style={styles.rowLabel}>Password: </Text>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={"gray"}
              value={pass}
              onChangeText={setPass}
              style={styles.textinp}
            />
          </View>
          <Pressable onPress={resetPW}><Text style={{color:"blue",fontSize:17,alignSelf:'flex-start',marginLeft:15,marginTop:5}}>Forgot Password?</Text></Pressable>
          <AuthButton theme="orange" text="Login" action={signIn} />
          <Pressable onPress={signUp}><Text style={{color:"blue",fontSize:17,alignSelf:'flex-end',marginRight:15,marginTop:5}}>Sign Up</Text></Pressable>
          {/* <AuthButton text="Sign Up" action={signUp} /> */}

          </View>
          
          </KeyboardAvoidingView>)}
          </View>
          );
}

export default Auth;