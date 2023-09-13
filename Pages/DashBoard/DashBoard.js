import { SafeAreaView, Text, Button, FlatList, View } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import styles from './DashBoard.styles.js'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import Viewall from '../../src/components/Viewall/Viewall.js';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';



const DashBoard = ({navigation}) => {
  const profile = useSelector((state) => state.profile.value)
  console.log("PROFILEEEEEEEEEE: ", profile)
  const [user, setUser] = useState("");
  const [data, setData] = useState([])

  const onSubmit = async () => {
    let i;
    try {
      const notes = await firestore().collection('profiles').doc(profile).collection('records').get();
      const docs = notes.docs
      let docsData = []
      
      for (i=0; i< docs.length; i++) {
        docsData.push(docs[i])
      }

      setData(docsData)


    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  }

  useEffect(() => {
    getCurrentUser()
    if (getCurrentUser() == false) {
      console.log("LOGGED doesnt exist");
      navigation.navigate("Home");
    }

    // onSubmit();

  }, [])


  useFocusEffect(
    useCallback(() => {
      onSubmit();
    }, [])
  )


  

  const signOut = () => {
    auth().signOut() 
                .then(res => {
                  console.log('successfully logged out: ', res)
                  navigation.navigate('Home')
                }) 
                .catch(err => console.log('logout hata olustu: ', err))     }  

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
  
  const render = ({item}) => {
    // console.log("LANNNN bu ne ", item.data())
    return(
      <Viewall data={item} />
    )
  }

  return (
    <SafeAreaView>
      <Text style={{textAlign:'center', fontWeight:'bold', fontSize:30,color:'orange'}}>DASHBOARD</Text>
      <Text>User: {user} </Text>
      <Text>Selected Profile: {profile} </Text>
      <Button title='LOGOUT' onPress={signOut} />
      <Button title='SUBMIT' color={"red"} onPress={onSubmit} />
      <FlatList data={data} renderItem={render} />
    </SafeAreaView>
  )
}

export default DashBoard;