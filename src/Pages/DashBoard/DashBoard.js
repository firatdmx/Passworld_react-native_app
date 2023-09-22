import { Text, Button, FlatList, View, TouchableOpacity, TextInput, Alert, ToastAndroid } from 'react-native'
import React, {useState, useCallback, useRef, useEffect} from 'react'
import styles from './DashBoard.styles.js'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import Viewall from '../../components/Viewall';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import FloatingButton from '../../components/FloatingButton';
import Modal from 'react-native-modal';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import CryptoJS from 'react-native-crypto-js';
import * as Keychain from 'react-native-keychain';


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
  const [data, setData] = useState([])
  const [fullData, setFullData] = useState([])
  const [newPlatformName, setNewPlatformName] = useState("")
  const [newUserName, setNewUserName] = useState("")
  const [newPassword, setNewPassword] = useState("")
  
  const [searchText, setSearchText] = useState("")
  const [encKey, setEncKey] = useState("")

  const [modalVisible, setModalVisible] = useState(false)
  
  const getRecords = async (encrtipKey) => {
    try {
      const notes = await firestore().collection('profiles').doc(profile).collection('records').get();
      const docs = notes.docs
      let docsData = []

      docs.map((record) => {
        const xdata = record['_data']
        xdata["account"] = CryptoJS.AES.decrypt(xdata["account"], encrtipKey).toString(CryptoJS.enc.Utf8)
        xdata["pass"] = CryptoJS.AES.decrypt(xdata["pass"], encrtipKey).toString(CryptoJS.enc.Utf8)
        // console.log(record)
        docsData.push(record)
      })

      setData(docsData)
      setFullData(docsData)

    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  }


  const retrieveEncryptionKey = async () => {
    try {
      const result = await Keychain.getGenericPassword();
      if (result) {
        const encryptionKey = result.password;
        setEncKey(encryptionKey)
        // console.log('Retrieved encryption key:', encryptionKey);
        getRecords(encryptionKey)
        // return encryptionKey;
      } else {
        console.log('Encryption key not found.');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving encryption key:', error);
      return null;
    }
  };


  useFocusEffect(
    useCallback(() => {
      retrieveEncryptionKey();
      // getRecords();
    }, [])
    )

    useEffect(() => {
      getCurrentUser();
      retrieveEncryptionKey();
      // getRecords();

      return () => {
        getCurrentUser();
        // getRecords();
      }
    }, [])



  const getCurrentUser = () => {
    const user = auth().currentUser;
    if (user) {
      // console.log(user.email); //print active user
      // setUser(user.email)
      return true;
    } else {
      console.log('logged user not found');
      return false;
    }
  };      

  const handleSave = () => {
    if (newPlatformName && newUserName && newPassword) {
      const encryptedAcc = CryptoJS.AES.encrypt(newUserName, encKey).toString();
      const encryptedPass = CryptoJS.AES.encrypt(newPassword, encKey).toString();
      firestore().collection("profiles").doc(profile).collection('records').add({
        platform: newPlatformName,
        account: encryptedAcc,
        pass: encryptedPass
      })
      setModalVisible(false);
      ToastAndroid.show("New '"+newPlatformName+"' record has been added successfully.", ToastAndroid.LONG)
      setNewPlatformName("")
      setNewUserName("")
      setNewPassword("")
      retrieveEncryptionKey() //burayı düzeltmelisin dostum
    } else {
      Alert.alert("Error", "Make sure you have filled all of the fields.")

    }
  }
  
  const render = ({item}) => {
    // console.log("LANNNN bu ne ", item.data())
    return(
      <Viewall data={item} refresh={retrieveEncryptionKey}/>
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

  

  const handleTextChange = (text) => {
    if (text) {
      setSearchText(text)
      const filteredData = (fullData.filter(element => {
        return element["_data"]["platform"].includes(searchText) || element["_data"]["account"].includes(searchText)
      }))
      setData(filteredData)
    } else {
      setSearchText(text)
      setData(fullData)
    }
  }



  return (
    <View style={styles.main}>
      <View>
        <Text style={styles.title}>DASHBOARD</Text>
        <Button title="test" onPress={() => console.log(encKey)} />
        
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:"red", margin:15, borderRadius:50,padding:5}}>

          <View style={{flex:1,flexDirection:"column",}}>
            <TextInput value={searchText} onChangeText={handleTextChange} style={{padding:10,paddingLeft:15,paddingBottom:0,fontSize:17,color:"white",fontWeight:'bold',}} cursorColor={"white"} placeholderTextColor={"#ffffff99"} placeholder='SEARCH...' />
            <View style={{borderTopWidth:1,borderTopColor:'#ffffff99',marginHorizontal:15}} />
          </View>
            <TouchableHighlight underlayColor="#ffffff80" onPress={() => handleTextChange("")} style={{marginRight:10,borderRadius:50}}>
              <Icon style={{marginRight:5}} name={"delete"} color={'white'} size={25} />
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