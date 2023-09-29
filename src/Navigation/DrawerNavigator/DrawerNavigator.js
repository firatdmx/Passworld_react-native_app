import React, {useEffect, useState} from 'react';
import {Text, Button, View, Pressable} from "react-native"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import AppStack from '../AppStack';
import auth from '@react-native-firebase/auth'
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './DrawerNavigator.styles'
import { DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';


function CustomDrawerContent(props) {

  const navigation = useNavigation();

  const [user, setUser] = useState("");

  const getCurrentUser = () => {
    const user = auth().currentUser;
    if (user) {
      // console.log(user.email); //print active user
      setUser(user.email)
      return true;
    } else {
      console.log('logged user not found');
      return false;
    }
  };    


  useEffect(() => {
    getCurrentUser()
  }, [])
  

  const profile = useSelector((state) => state.profile.value)

  const signOut = () => {
    auth().signOut()
                .then(res => {
                  console.log('successfully logged out: ', res)
                }) 
                .catch(err => console.log('logout hata olustu: ', err))     } 

// ██████  ███████ ███    ██ ██████  ███████ ██████  
// ██   ██ ██      ████   ██ ██   ██ ██      ██   ██ 
// ██████  █████   ██ ██  ██ ██   ██ █████   ██████  
// ██   ██ ██      ██  ██ ██ ██   ██ ██      ██   ██ 
// ██   ██ ███████ ██   ████ ██████  ███████ ██   ██ 
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContentScroll} >        
      <DrawerItemList {...props} />

        <View style={styles.avatarContainer}>
            <Pressable onLongPress={() => console.log("clicked avatar")}>
              <Text style={styles.avatarChar}>{user && user[0].toUpperCase()}</Text>
            </Pressable>
        </View>

        <Text style={styles.infoText}>User: <Text style={{color:'red'}}>{user}</Text></Text>
        <Text style={styles.infoText}>Profile: {profile ? profile : "not selected"}</Text>
        <Button title="Profiles" color="orange" onPress={() => navigation.navigate("Profiles")} />
        <Button title="Settings" color="#aaaa00" onPress={() => navigation.navigate("Settings")} />
      
      <View style={styles.drawerFooterContainer}>
        <Pressable style={styles.signOutBtn} onPress={signOut}>
            <View style={styles.signOutBtnTextContainer}>
              <Icon name={"logout"} color={'white'} size={30} />
              <Text style={styles.signOutBtnText}>
                LOGOUT
              </Text>
            </View>
        </Pressable>
      </View>

    </DrawerContentScrollView>
  );
}


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent} >
      <Drawer.Screen name="DrawerHome" component={HomeScreen} 
            options={{
              drawerItemStyle:styles.drawerItemStyle,
              headerShown:false,
              }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;


const HomeScreen = () => {
    return (
      <AppStack />
    );
  };