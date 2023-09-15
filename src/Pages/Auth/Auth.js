import { Text, View, TextInput } from 'react-native'
import React,{useState} from 'react'
import styles from './Auth.styles.js'
import auth from '@react-native-firebase/auth'
import AuthButton from '../../components/AuthButton';


const Auth = () => {

  const [mail, setMail] = useState("dev@dev.com");
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
                .then(res => console.log("successfull, " +res)) 
                .catch(error => { console.log("hataaaaaaa ", error)  })  
        }
      }
  

  const signIn = () => {
      if(mailpassExist()) {
        auth().signInWithEmailAndPassword(mail, pass) 
                    .then(res => (
                      console.log("successfull, " +res)
                    )
                      ) 
                    .catch(error => { console.log("hataaaaaaa ", error)  })  
        }
      }
   

  const getCurrentUser = () => {
        const user = auth().currentUser; 
        if (user) {
            // console.log(user)
            // console.log(user.email)
            return true
        } else {
            console.log("logged user not found")
            return false
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