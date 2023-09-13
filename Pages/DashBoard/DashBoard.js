import { Text, Button, FlatList, View, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import styles from './DashBoard.styles.js'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import Viewall from '../../src/components/Viewall/Viewall.js';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import FloatingButton from '../../src/components/FloatingButton/FloatingButton.js';
import Modal from 'react-native-modal';


const DashBoard = ({navigation}) => {
  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;
  const profile = useSelector((state) => state.profile.value)
  console.log("PROFILEEEEEEEEEE: ", profile)
  const [user, setUser] = useState("");
  const [data, setData] = useState([])
  const [newPlatformName, setNewPlatformName] = useState("")
  const [newUserName, setNewUserName] = useState("")
  const [newPassword, setNewPassword] = useState("")
  
  const [modalVisible, setModalVisible] = useState(false)
  
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
    console.log("DATA BR:", data)
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

  const handleSave = () => {
    console.log("Platform: ", newPlatformName)
    console.log("User: ", newUserName)
    console.log("Password: ", newPassword)

    firestore().collection("profiles").doc(profile).collection('records').add({
      platform: newPlatformName,
      account: newUserName,
      pass: newPassword
    })
    setModalVisible(false);
    onSubmit();




  }
  
  const render = ({item}) => {
    // console.log("LANNNN bu ne ", item.data())
    return(
      <Viewall data={item} />
    )
  }

  return (
    <View style={styles.main}>
      <View>
        <Text style={{textAlign:'center', fontWeight:'bold', fontSize:30,color:'orange'}}>DASHBOARD</Text>
        <Text>User: {user} </Text>
        <Text>Selected Profile: {profile} </Text>
        <Button title='LOGOUT' onPress={signOut} />
        <Button title='SUBMIT' color={"red"} onPress={onSubmit} />
        
        {data.length > 0 ? <FlatList data={data} renderItem={render} /> : <Text> No entries found</Text>}
      </View>
      
      <View style={styles.floatingButtonView}>
        <FloatingButton pressAction={() => setModalVisible(!modalVisible)}  title={"Add"}/>
      </View>
      
      <Modal 
              isVisible={modalVisible}
              statusBarTranslucent={true}
              onBackButtonPress={() => setModalVisible(!modalVisible)}
              onBackdropPress={() => setModalVisible(!modalVisible)}
              animationType="fade"
              transparent={true}
              >
              
              <View style={{alignSelf:'center', width:deviceWidth * 0.7 , height:deviceHeight * 0.33, backgroundColor:'white',padding:5}}>
                <Text style={{textAlign:'center', fontWeight:'bold',fontSize:20,color:'red',marginTop:0,top:0}}>Add New Profile</Text>
                <Text>Platform:</Text>
                <TextInput style={{borderWidth:1,borderRadius:2,padding:3,margin:5}} placeholder='Enter Platform name ' value={newPlatformName} onChangeText={setNewPlatformName} />
                <Text>User:</Text>
                <TextInput style={{borderWidth:1,borderRadius:2,padding:3,margin:5}} placeholder='Enter user name ' value={newUserName} onChangeText={setNewUserName} />
                <Text>Password:</Text>
                <TextInput style={{borderWidth:1,borderRadius:2,padding:3,margin:5}} placeholder='Enter password ' value={newPassword} onChangeText={setNewPassword} />

                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                  <TouchableOpacity onPress={() => console.log("Cancel")} style={{alignItems:'flex-end'}}>
                    <Text style={{fontWeight:'bold',marginRight:15, borderWidth:1,borderRadius:10,padding:5,backgroundColor:'red',color:'white'}}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleSave} style={{alignItems:'flex-end'}}>
                    <Text style={{fontWeight:'bold',marginRight:15, borderWidth:1,borderRadius:10,padding:5,paddingHorizontal:15,backgroundColor:'green',color:'white'}}>Add</Text>
                  </TouchableOpacity>

                </View>

              </View>
            </Modal>
      

    </View>
  )
}

export default DashBoard;