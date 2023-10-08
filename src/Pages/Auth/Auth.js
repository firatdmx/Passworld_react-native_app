import { Text, View, TextInput } from 'react-native'
import React,{useState} from 'react'
import styles from './Auth.styles.js'
import auth from '@react-native-firebase/auth'
import AuthButton from '../../components/AuthButton';
import {setUserInfo} from '../../features/userInfo/userInfoSlice';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.js';
import firestore from '@react-native-firebase/firestore';


const Auth = () => {

  const [loading, setLoading] = useState(false)

  
  const [mail, setMail] = useState("dev@dev.com");   //bunlar null olacak
  const [pass, setPass] = useState("123456");

  const mailpassExist = () => {
      if (mail && pass) {
        return true;
        
      } else{
        console.log("mail or pass cannot be empty")
        return false;
      }
    }

  const signUp = () => {
      setLoading(true)
        if(mailpassExist()) {
          auth().createUserWithEmailAndPassword(mail, pass) 
                .then(res => (
                  console.log("signup successfull, " +res),
                  setLoading(false)
                  ))
                .catch(error => { console.log("hataaaaaaa ", error)  })  
        }
      }
  

  const signIn = () => {
    setLoading(true)
      if(mailpassExist()) {
        auth().signInWithEmailAndPassword(mail, pass) 
                    .then(res => (
                      setLoading(false),
                      setUserInfo(res),
                      checkUserDocument()
                      // console.log("abi res burada: ", res)
                    )
                      ) 
                    .catch(error => { console.log("hataaaaaaa ", error)  })  
        }
      }

  const checkUserDocument = async () => {
    const userMail =  getCurrentUser()
    console.log(userMail)
    const userXget = await firestore().collection('users').doc(userMail).get();
    const userX = firestore().collection('users').doc(userMail);
    if (userXget.exists) {
      console.log("user EXISTS")
    } else {
      userX.set({})
      // await firestore().collection('users').doc(userMail).collection('profiles').add({"silbeni":"tamam"})
      // .then((ref)=> {
      //   console.log("refffffffffffffffffffffffff:" , ref)
      //   ref.delete()
      // })
      console.log("NOT EXISTS WORKED")
    }
  }
  const getCurrentUser = () => {
    const user = auth().currentUser;
    if (user) {
      return user.email;
    } else {
      console.log('logged user not found');
      return null;
    }
  };

   
// ██████  ███████ ███    ██ ██████  ███████ ██████  
// ██   ██ ██      ████   ██ ██   ██ ██      ██   ██ 
// ██████  █████   ██ ██  ██ ██   ██ █████   ██████  
// ██   ██ ██      ██  ██ ██ ██   ██ ██      ██   ██ 
// ██   ██ ███████ ██   ████ ██████  ███████ ██   ██ 
    return (
      <View style={{flex:1}}>
        {loading ? <LoadingSpinner msg={"Please Wait..."} /> : (

      <View style={styles.main}>
        <View style={styles.secondMain}>
          <Text style={styles.slogan}>
            Your Pass World!
          </Text>

          <View style={styles.textinpRows}>
            <Text style={styles.rowLabel}>Mail: </Text>
            <TextInput
              placeholder="Enter your e-mail address"
              value={mail}
              onChangeText={setMail}
              style={styles.textinp}
            />
          </View>

          <View style={styles.textinpRows}>
            <Text style={styles.rowLabel}>Pass: </Text>
            <TextInput
              placeholder="Enter your password"
              value={pass}
              onChangeText={setPass}
              style={styles.textinp}
            />
          </View>

          <AuthButton theme="orange" text="Login" action={signIn} />
          <AuthButton text="Sign Up" action={signUp} />

          </View>
          
          </View>)}
          </View>
          );
}

export default Auth;