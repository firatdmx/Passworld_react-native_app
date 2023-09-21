import { Text, View, TextInput } from 'react-native'
import React,{useState} from 'react'
import styles from './Auth.styles.js'
import auth from '@react-native-firebase/auth'
import AuthButton from '../../components/AuthButton';
import {setUserInfo} from '../../features/userInfo/userInfoSlice';


const Auth = () => {

  
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
        if(mailpassExist()) {
          auth().createUserWithEmailAndPassword(mail, pass) 
                .then(res => console.log("signup successfull, " +res)) 
                .catch(error => { console.log("hataaaaaaa ", error)  })  
        }
      }
  

  const signIn = () => {
      if(mailpassExist()) {
        auth().signInWithEmailAndPassword(mail, pass) 
                    .then(res => (
                      setUserInfo(res),
                      console.log("abi res burada: ", res)
                    )
                      ) 
                    .catch(error => { console.log("hataaaaaaa ", error)  })  
        }
      }
   

    return (
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
          </View>
          );
}

export default Auth;