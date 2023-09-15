import { Text, View, TextInput } from 'react-native'
import React,{useState} from 'react'
import styles from './Auth.styles.js'
import auth from '@react-native-firebase/auth'
import AuthButton from '../../components/AuthButton/AuthButton.js';


const Auth = ({navigation}) => {

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

  const signOut = () => {
        auth().signOut() 
                    .then(res => {
                      console.log('successfully logged out: ', res)
                    }) 
                    .catch(err => console.log('logout hata olustu: ', err))     }    

  const getCurrentUser = () => {
        const user = auth().currentUser; 
        if (user) {
            console.log(user)
            // console.log(user.email)
            return true
        } else {
            console.log("logged user not found")
            return false
        }
        }



        // useEffect(() => {
        //   // console.log("useeffect worked")
        //   if (getCurrentUser()) {
        //     // console.log("LOGGED EXISTS")
        //     navigation.navigate("Profiles")
        //   }
        // }, [logged])
        

    return (
      <View style={styles.main}>
        <View style={styles.secondMain}>
          <Text style={styles.slogan}>
            Welcome to my App. To login enter your info.
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
          <AuthButton text="Sign Out" action={signOut} />
          <AuthButton text="Who's There?" action={getCurrentUser} />

          </View>
          </View>
          );
}

export default Auth;