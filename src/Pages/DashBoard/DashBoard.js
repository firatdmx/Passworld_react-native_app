import { Text, Button, FlatList, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, {useState, useEffect, useCallback, useRef} from 'react'
import styles from './DashBoard.styles.js'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import Viewall from '../../components/Viewall/Viewall.js';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import FloatingButton from '../../components/FloatingButton/FloatingButton.js';
import Modal from 'react-native-modal';

// import CustomModal from '../../components/CustomModal/';
// import TestModal from '../../components/TestModal';


const DashBoard = () => {

  const dispatch = useDispatch()

  const usernameRef = useRef();
  const passwordRef = useRef();

  const focusUsername = () => {
    usernameRef.current.focus()
  }
  const focusPassword = () => {
    passwordRef.current.focus()
  }

  const profile = useSelector((state) => state.profile.value)
  console.log("PROFILEEEEEEEEEE: ", profile)
  const [user, setUser] = useState("");
  const [data, setData] = useState([])
  const [newPlatformName, setNewPlatformName] = useState("")
  const [newUserName, setNewUserName] = useState("")
  const [newPassword, setNewPassword] = useState("")
  
  const [modalVisible, setModalVisible] = useState(false)
  
  const getRecords = async () => {
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
    }

  }, [])


  useFocusEffect(
    useCallback(() => {
      getRecords();
    }, [])
  )


  const signOut = () => {
    auth().signOut() 
                .then(res => {
                  console.log('successfully logged out: ', res)
                  dispatch(logout())

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
    if (newPlatformName && newUserName && newPassword) {
      console.log("Platform: ", newPlatformName)
      console.log("User: ", newUserName)
      console.log("Password: ", newPassword)

      firestore().collection("profiles").doc(profile).collection('records').add({
        platform: newPlatformName,
        account: newUserName,
        pass: newPassword
      })
      setModalVisible(false);
      setNewPlatformName("")
      setNewUserName("")
      setNewPassword("")
      getRecords()
    } else {
      Alert.alert("Error", "Make sure you have filled all of the fields.")

    }
  }

  
  const render = ({item}) => {
    // console.log("LANNNN bu ne ", item.data())
    return(
      <Viewall data={item} refresh={getRecords} />
    )
  }

  // const yazdir = () => {
  //   return(
  //     <View style={styles.modal.main}>
  //               <Text style={styles.modal.title}>Add New Record</Text>
  //               <Text style={styles.modal.label}>Platform:</Text>
  //               <TextInput style={styles.modal.input} placeholder='Enter Platform name ' value={newPlatformName} onChangeText={setNewPlatformName} />
  //               <Text style={styles.modal.label}>User:</Text>
  //               <TextInput style={styles.modal.input} placeholder='Enter user name ' value={newUserName} onChangeText={setNewUserName} />
  //               <Text style={styles.modal.label}>Password:</Text>
  //               <TextInput style={styles.modal.input} placeholder='Enter password ' value={newPassword} onChangeText={setNewPassword} />

  //               <View style={styles.modal.buttonView}>
  //                 <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} >
  //                   <Text style={styles.modal.buttonText}>Cancel</Text>
  //                 </TouchableOpacity>

  //                 <TouchableOpacity onPress={handleSave} >
  //                   <Text style={styles.modal.buttonText}>Add</Text>
  //                 </TouchableOpacity>

  //               </View>

  //             </View>
  //   )
  // }

  const handleCancel = () => {
    setModalVisible(!modalVisible)
    setNewPlatformName("")
    setNewUserName("")
    setNewPassword("")
  }

  return (
    <View style={styles.main}>
      <View>
        <Text style={styles.title}>DASHBOARD</Text>
        {/* <Text>User: {user} </Text> */}
        <Text>Active User: {user} </Text>
        <Text>Chosen Profile: {profile} </Text>

        {/* bunu drawera ekle */}
        <Button title='LOGOUT' onPress={signOut} />
        
        {data.length > 0 ? <FlatList data={data} renderItem={render} /> : <Text> No entries found</Text>}
      </View>
      
      <View style={styles.floatingButtonView}>
        <FloatingButton pressAction={() => {
          setModalVisible(!modalVisible)
          console.log("modal visible status: ", modalVisible)
          }}  title={"+"}/>
      </View>


      {/* <CustomModal isVisible={modalVisible} content={yazdir()} onClose={() => setModalVisible(!modalVisible)} /> */}

      {/* {modalVisible && <TestModal />} */}
      
      <Modal 
              isVisible={modalVisible}
              statusBarTranslucent={false}
              onBackButtonPress={handleCancel}
              onBackdropPress={handleCancel}
              animationType="slide"
              transparent={true}
              >
              
              <View style={styles.modal.main}>
                <Text style={styles.modal.title}>Add New Record</Text>
                <Text style={styles.modal.label}>Platform:</Text>
                <TextInput returnKeyType="next" accessible={false} accessibilityLabel="Input Platform Name" style={styles.modal.input} placeholder='Enter Platform name ' value={newPlatformName} onChangeText={setNewPlatformName} onSubmitEditing={focusUsername} />
                <Text style={styles.modal.label}>User:</Text>
                <TextInput returnKeyType="next" accessible={true} accessibilityLabel="Input User Name" ref={usernameRef} style={styles.modal.input} placeholder='Enter user name ' value={newUserName} onChangeText={setNewUserName} onSubmitEditing={focusPassword} />
                <Text style={styles.modal.label}>Password:</Text>
                <TextInput returnKeyType="done" accessible={true} accessibilityLabel="Input Password" ref={passwordRef} style={styles.modal.input} placeholder='Enter password ' value={newPassword} onChangeText={setNewPassword} onSubmitEditing={handleSave} />

                <View style={styles.modal.buttonView}>
                  <TouchableOpacity onPress={handleCancel} >
                    <Text style={styles.modal.buttonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity returnKeyType="send" accessible={true} accessibilityLabel="Input Password" onPress={handleSave} >
                    <Text style={styles.modal.buttonText}>Add</Text>
                  </TouchableOpacity>

                </View>

              </View>
            </Modal>
      

    </View>
  )
}

export default DashBoard;