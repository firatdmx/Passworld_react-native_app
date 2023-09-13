import { Text, View, Pressable, TextInput } from 'react-native'
import React,{useState, useEffect} from 'react'
import styles from './Auth.styles.js'
import auth from '@react-native-firebase/auth'

const Auth = ({navigation}) => {

  



    const [mail, setMail] = useState("dev@dev.com");
    const [pass, setPass] = useState("123456");
    const [logged, setLogged] = useState(false);

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
                      console.log("successfull, " +res),
                      setLogged(true)
                    )
                      ) 
                    .catch(error => { console.log("hataaaaaaa ", error)  })  
        }
      }

    const signOut = () => {
        auth().signOut() 
                    .then(res => {  
                            console.log('successfully logged out: ', res) 
                            // navigation.navigate('Login Screen')          
                    }) 
                    .catch(err => console.log('logout hata olustu: ', err))     }    

    const getCurrentUser = () => {
        const user = auth().currentUser; 
        if (user) {
            // console.log(user.email)
            return true
        } else {
            console.log("logged user not found")
            return false
        }
        }


        useEffect(() => {
          // console.log("useeffect worked")
          if (getCurrentUser()) {
            // console.log("LOGGED EXISTS")
            navigation.navigate("Profiles")
          }
        }, [logged])
        

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

          <View>
            <Pressable
              onPress={signIn}
              style={[styles.buttonS, {backgroundColor:'orange'}]}>
              <Text style={styles.buttonSText}>
                Login
              </Text>
            </Pressable>
          </View>

          <View>
            <Pressable
              onPress={signUp}
              style={styles.buttonS}>
              <Text style={styles.buttonSText}>
                Sign Up
              </Text>
            </Pressable>
          </View>

          <View>
            <Pressable
              onPress={signOut}
              style={styles.buttonS}>
              <Text style={styles.buttonSText}>
                Sign Out
              </Text>
            </Pressable>
          </View>

          <View>
            <Pressable
              onPress={getCurrentUser}
              style={styles.buttonS}>
              <Text style={styles.buttonSText}>
                Who's There?
              </Text>
            </Pressable>
          </View>

        </View>
      </View>
    );
}

export default Auth;