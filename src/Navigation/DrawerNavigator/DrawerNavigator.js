import React, {useEffect, useState} from 'react';
import {Text, Button, View, Pressable} from "react-native"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import AppStack from '../AppStack';
import auth from '@react-native-firebase/auth'
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';


function CustomDrawerContent(props) {

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


  return (
    <DrawerContentScrollView {...props} 
      // style={{flex:1,backgroundColor:"red"}}
      contentContainerStyle={{flex:1,paddingTop:"20%",}} 
      >
        
      <DrawerItemList {...props} />

      <View style={{
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'orange',
    borderWidth:1,
    alignSelf:'center',
    margin:10,
  }}>
                    <Pressable onLongPress={() => console.log("clicked avatar")}>
                        <Text style={{flex:1,textAlign:'center',fontWeight:'bold',fontSize: 70,color: 'white'}}>
                          {user && user[0].toUpperCase()}
                        </Text>
                    </Pressable>
      </View>

      
      <Text style={{fontSize:17,textAlign:'center',fontWeight:'bold',color:'black'}}>User: <Text style={{color:'red'}}>{user}</Text></Text>
      <Text style={{fontSize:17,textAlign:'center',fontWeight:'bold',color:'black',marginBottom:10}}>Profile: {profile ? profile : "not selected"}</Text>
      <Button
        title="Layn"
        color={"orange"}
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
      
      <View style={{flex:1,justifyContent:'flex-end',}}>
        <Pressable style={{height:70,backgroundColor:'red',justifyContent:'center',alignItems:'center'}} onPress={signOut}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Icon style={{marginRight:10}} name={"logout"} color={'white'} size={30} />
              <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>
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
    <Drawer.Navigator 
      drawerContent={CustomDrawerContent}
      initialRouteName="DrawerHome"
      screenOptions={{
        drawerStyle:{margin:0,padding:0}
        }}>

      <Drawer.Screen name="DrawerHome" component={HomeScreen} 
            options={{
              drawerItemStyle:{display:"none", backgroundColor:'black'},
              headerShown:false,
              headerTransparent:true, 
              headerTitle:"",
              margin:0,
              padding:0,
              headerLeftContainerStyle:{
                      backgroundColor:"#white",
                      borderTopRightRadius:50,
                      borderBottomRightRadius:50,
                      shadowOffset: {width: 5,height: 5},
                      shadowRadius:3,
                      shadowOpacity:1,
                      elevation:10,
                      shadowColor:'black',
                      // marginLeft:-10,
                        }
              }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;


const HomeScreen = () => {
    // const navigation = useNavigation();
  
    // const openDrawer = () => {
    //   navigation.openDrawer();
    // };
  
    return (
      <AppStack />
    );
  };