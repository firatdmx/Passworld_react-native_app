import { Text, Button, FlatList, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, {useState, useCallback, useRef} from 'react'
import styles from './DashBoard.styles.js'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import Viewall from '../../components/Viewall';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import FloatingButton from '../../components/FloatingButton';
import Modal from 'react-native-modal';
import { TouchableHighlight } from 'react-native-gesture-handler';

// import CustomModal from '../../components/CustomModal/';
// import TestModal from '../../components/TestModal';


const DashBoard = () => {


  const platformRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();


  const focusPlatformName = () => {
    platformRef.current.focus()
  }
  const focusUsername = () => {
    usernameRef.current.focus()
  }
  const focusPassword = () => {
    passwordRef.current.focus()
  }

  const profile = useSelector((state) => state.profile.value)
  // console.log("PROFILEEEEEEEEEE: ", profile)
  const [user, setUser] = useState("");
  const [data, setData] = useState([])
  const [newPlatformName, setNewPlatformName] = useState("")
  const [newUserName, setNewUserName] = useState("")
  const [newPassword, setNewPassword] = useState("")
  
  const [searchText, setSearchText] = useState("")

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


  useFocusEffect(
    useCallback(() => {
      getCurrentUser();
      getRecords();
    }, [])
  )


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
      // console.log("Platform: ", newPlatformName)
      // console.log("User: ", newUserName)
      // console.log("Password: ", newPassword)

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
      <Viewall data={item} refresh={getRecords}/>
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

  const separator = () => {
    return(
      <View style={{borderBottomWidth:0,borderStyle:'dotted'}} />
    )
  }

  return (
    <View style={styles.main}>
      <View>
        <Text style={styles.title}>DASHBOARD</Text>
        
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:"red", margin:15, borderRadius:50,padding:5}}>

          <View style={{flex:1,flexDirection:"column",}}>
            <TextInput value={searchText} onChangeText={setSearchText} style={{padding:10,paddingLeft:15,paddingBottom:0,fontSize:17,color:"white",fontWeight:'bold',}} cursorColor={"white"} placeholderTextColor={"#ffffff99"} placeholder='SEARCH...' />
            <View style={{borderTopWidth:1,borderTopColor:'#ffffff99',marginHorizontal:15}} />
          </View>
            <TouchableHighlight underlayColor="#ffffff80" onPress={() => setSearchText("")} style={{marginRight:10,borderRadius:50}}>
              <Text style={{fontWeight:'bold',fontSize:20,color:'white'}}>(X)</Text>
            </TouchableHighlight>


        </View>
        
        {
        data.length > 0 ? 
        <FlatList data={data} renderItem={render} ItemSeparatorComponent={separator} /> 
        : 
        <View style={{backgroundColor:"lightblue",height:30,justifyContent:'center'}}>
          <Text style={{textAlign:'center',fontWeight:'bold',color:'black'}}> No entries found</Text>
        </View>
        }
      </View>
      
      <View style={styles.floatingButtonView}>
        <FloatingButton pressAction={() => {
          setModalVisible(true)
          }}  title={"+"}/>
      </View>


      {/* <CustomModal isVisible={modalVisible} content={yazdir()} onClose={() => setModalVisible(!modalVisible)} /> */}

      {/* {modalVisible && <TestModal />} */}
      
{/*
  __  __  ____  _____          _        
 |  \/  |/ __ \|  __ \   /\   | |     
 | \  / | |  | | |  | | /  \  | |     
 | |\/| | |  | | |  | |/ /\ \ | |      
 | |  | | |__| | |__| / ____ \| |____  
 |_|  |_|\____/|_____/_/    \_\______|
*/}

      <Modal 
              isVisible={modalVisible}
              statusBarTranslucent={false}
              onBackButtonPress={handleCancel}
              onBackdropPress={handleCancel}
              animationType="slide"
              transparent={true}
              hardwareAccelerated
              onShow={focusPlatformName}
              >
              
              <View style={styles.modal.main}>
                <Text style={styles.modal.title}>Add New Record</Text>
                
                <Text style={styles.modal.label}>Platform:</Text>
                <TextInput 
                  returnKeyType="next" 
                  accessible={false} 
                  accessibilityLabel="Input Platform Name"
                  ref={platformRef}
                  style={styles.modal.input} 
                  placeholder='Enter Platform name ' 
                  value={newPlatformName} 
                  onChangeText={setNewPlatformName} 
                  onSubmitEditing={focusUsername}
                  />
                
                <Text style={styles.modal.label}>User:</Text>
                <TextInput 
                  returnKeyType="next" 
                  accessible={true} 
                  accessibilityLabel="Input User Name" 
                  ref={usernameRef}
                  style={styles.modal.input} 
                  placeholder='Enter user name ' 
                  value={newUserName} 
                  onChangeText={setNewUserName} 
                  onSubmitEditing={focusPassword}
                />
                
                <Text style={styles.modal.label}>Password:</Text>
                <TextInput 
                  returnKeyType="done"
                  accessible={true} 
                  accessibilityLabel="Input Password" 
                  ref={passwordRef} 
                  style={styles.modal.input} 
                  placeholder='Enter password '
                  value={newPassword}
                  onChangeText={setNewPassword}
                  onSubmitEditing={handleSave}
                  />

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