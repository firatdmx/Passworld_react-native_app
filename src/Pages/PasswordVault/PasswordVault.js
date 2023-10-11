import { Text, Button, FlatList, View, TouchableOpacity, TextInput, Alert, ToastAndroid } from 'react-native'
import React, {useState, useCallback, useRef, useEffect} from 'react'
import styles from './PasswordVault.styles.js'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import Viewall from '../../components/Viewall/index.js';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import FloatingButton from '../../components/FloatingButton/index.js';
import Modal from 'react-native-modal';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import CryptoJS from 'react-native-crypto-js';
import * as Keychain from 'react-native-keychain';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


// import CustomModal from '../../components/CustomModal/';
// import TestModal from '../../components/TestModal';


const PasswordVault = () => {
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState("");

  const getCurrentUser = () => {
    const user = auth().currentUser;
    if (user) {
      // console.log(user.email); //print active user. ayrica user.email yerine full user bilgilerini kaydet
      setUser(user.email)
      return user.email;
    } else {
      console.log('logged user not found');
      return false;
    }
  };





  const [loading, setLoading] = useState(false)

  const platformRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const editModalPlatformRef = useRef();
  const editModalUsernameRef = useRef();
  const editModalPasswordRef = useRef();


  const focusPlatformName = () => {
    platformRef.current.focus()
  }
  const focusUsername = () => {
    usernameRef.current.focus()
  }
  const focusPassword = () => {
    passwordRef.current.focus()
  }


  const editModalFocusPlatformName = () => {
    editModalPlatformRef.current.focus()
  }
  const editModalFocusUsername = () => {
    editModalUsernameRef.current.focus()
  }
  const editModalFocusPassword = () => {
    editModalPasswordRef.current.focus()
  }

  const profile = useSelector((state) => state.profile.value)
  const [data, setData] = useState([])
  const [fullData, setFullData] = useState([])

  const [newPlatformName, setNewPlatformName] = useState("")
  const [newUserName, setNewUserName] = useState("")
  const [newPassword, setNewPassword] = useState("")
  
  const [editModalNewPlatformName, setEditModalNewPlatformName] = useState("")
  const [editModalNewUserName, setEditModalNewUserName] = useState("")
  const [editModalNewPassword, setEditModalNewPassword] = useState("")

  const [searchText, setSearchText] = useState("")
  const [encKey, setEncKey] = useState("")

  const [modalVisible, setModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  
  const getRecords = async (encrtipKey) => {
    // const userMail = getCurrentUser()
    setLoading(true)
    try {
      const notes = await firestore().collection('users').doc(user).collection("profiles").doc(profile).collection('records').get();
      
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
      setLoading(false)

    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  }


  const retrieveEncryptionKey = async () => {
    try {
      const result = await Keychain.getGenericPassword({service: "SPECIAL"});
      if (result) {
        // console.log("PasswordVault.js result: ", result)
        const encryptionKey = result.password;
        setEncKey(encryptionKey)
        // console.log('Retrieved encryption key:', encryptionKey);
        if(encryptionKey) {
          // console.log("encryption key geldi abicim: ", encryptionKey)
          getRecords(encryptionKey)
        }
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
      if (user) {retrieveEncryptionKey()}
    }, [user])
    )

    useEffect(() => {
      getCurrentUser();
      // if (user) {retrieveEncryptionKey()}

      return () => {
        getCurrentUser();
      }
    }, [])



      

  const recordIDValue = useSelector((state) => state.recordID.value)

  const handleSave = () => {
    // const userMail = getCurrentUser()
    if (newPlatformName && newUserName && newPassword) {
      const encryptedAcc = CryptoJS.AES.encrypt(newUserName, encKey).toString();
      const encryptedPass = CryptoJS.AES.encrypt(newPassword, encKey).toString();
      firestore().collection('users').doc(user).collection("profiles").doc(profile).collection('records').add({
        platform: newPlatformName,
        account: encryptedAcc,
        pass: encryptedPass
      })
      setModalVisible(false);
      ToastAndroid.show("New '"+newPlatformName+"' record has been added successfully.", ToastAndroid.LONG)
      setNewPlatformName("")
      setNewUserName("")
      setNewPassword("")
      retrieveEncryptionKey() //burayı düzeltmelisin dostum!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    } else {
      Alert.alert("Error", "Make sure you have filled all of the fields.")

    }
  }
  const editModalhandleSave = () => {
    // const userMail = getCurrentUser()
    if (editModalNewPlatformName && editModalNewUserName && editModalNewPassword) {
      const encryptedAcc = CryptoJS.AES.encrypt(editModalNewUserName, encKey).toString();
      const encryptedPass = CryptoJS.AES.encrypt(editModalNewPassword, encKey).toString();
      firestore()
      .collection('users')
      .doc(user)
      .collection("profiles")
      .doc(profile)
      .collection('records')
      .doc(recordIDValue)
      .update({
        platform: editModalNewPlatformName,
        account: encryptedAcc,
        pass: encryptedPass
      })
      setEditModalVisible(false);
      ToastAndroid.show("'"+editModalNewPlatformName+"' record has been changed successfully.", ToastAndroid.LONG)
      setEditModalNewPlatformName("")
      setEditModalNewUserName("")
      setEditModalNewPassword("")
      retrieveEncryptionKey() //burayı düzeltmelisin dostum
    } else {
      Alert.alert("Error", "Make sure you have filled all of the fields.")

    }
  }

  const runme= (platf,usern,passw) => {
    setEditModalNewPlatformName(platf)
    setEditModalNewUserName(usern)
    setEditModalNewPassword(passw)
    setEditModalVisible(!editModalVisible)
  }
  
  const render = ({item}) => {
    const plat = item.data()["platform"]
    const acc = item.data()["account"]
    const pass = item.data()["pass"]
    return(
      <Viewall data={item} refresh={retrieveEncryptionKey} edit={() => runme(plat, acc, pass) }/>
    )
  }


  const handleCancel = () => {
    setModalVisible(!modalVisible)
    setNewPlatformName("")
    setNewUserName("")
    setNewPassword("")
  }
  const editModalHandleCancel = () => {
    setEditModalVisible(!editModalVisible)
    setNewPlatformName("")
    setNewUserName("")
    setNewPassword("")
  }

  const separator = () => {
    return(
      <View style={styles.separator} />
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


// ██████  ███████ ███    ██ ██████  ███████ ██████  
// ██   ██ ██      ████   ██ ██   ██ ██      ██   ██ 
// ██████  █████   ██ ██  ██ ██   ██ █████   ██████  
// ██   ██ ██      ██  ██ ██ ██   ██ ██      ██   ██ 
// ██   ██ ███████ ██   ████ ██████  ███████ ██   ██ 
                                                    

  return (
    <View style={styles.main}>
<View style={{flexDirection:'row',backgroundColor:'transparent', alignItems:'center'}}>
      
        <View style={styles.searchBarContainer}>
          {/* <View style={styles.searchBarTextInputView}> */}
          
          <View style={{flex:1}}>
            <TextInput value={searchText} onChangeText={handleTextChange} style={styles.searchBarTextInput} cursorColor={"white"} placeholderTextColor={"#ffffff99"} placeholder='SEARCH...' />
            <View style={styles.searchBarLine} />
          </View>

            <TouchableHighlight underlayColor="#ffffff80" onPress={() => handleTextChange("")} style={styles.searchBarDelBtn}>
              <Icon name={"delete"} color={'white'} size={25} />
            </TouchableHighlight>

      </View>

            <TouchableHighlight style={{backgroundColor:'transparent',justifyContent:'center',alignItems:'center',borderRadius:50,marginRight:10,marginLeft:10}} underlayColor="#ffffff50" onPress={() => setModalVisible(true)} >
              <Icon style={{textShadowColor: 'rgba(0, 0, 0, 0.75)',textShadowOffset: { width: -2, height: -1 }, textShadowRadius: 1}}  name={"plus-circle"} color={'orange'} size={50} />
            </TouchableHighlight>

</View>

        {loading ? <LoadingSpinner msg="Loading data..." /> : (
                  <View style={{flex:1, marginBottom: insets.bottom }}>
                  {
                  data.length > 0 ? 
                  <FlatList data={data} renderItem={render} ItemSeparatorComponent={separator} /> 
                  : 
                  <View style={styles.notFoundContainer}>
                    <Text style={styles.notFoundText}> No entries found</Text>
                  </View>
                  }
                  </View>
        )}

      {/* <View style={styles.floatingButtonView}>
        <FloatingButton pressAction={() => {
          setModalVisible(true)
          }}  title={"+"}/>
      </View> */}


      {/* <CustomModal isVisible={modalVisible} content={yazdir()} onClose={() => setModalVisible(!modalVisible)} /> */}

      {/* {modalVisible && <TestModal />} */}
      
{/*
███    ███  ██████  ██████   █████  ██      
████  ████ ██    ██ ██   ██ ██   ██ ██      
██ ████ ██ ██    ██ ██   ██ ███████ ██      
██  ██  ██ ██    ██ ██   ██ ██   ██ ██      
██      ██  ██████  ██████  ██   ██ ███████ 
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

{/*
███    ███  ██████  ██████   █████  ██      ██████  
████  ████ ██    ██ ██   ██ ██   ██ ██           ██ 
██ ████ ██ ██    ██ ██   ██ ███████ ██       █████  
██  ██  ██ ██    ██ ██   ██ ██   ██ ██      ██      
██      ██  ██████  ██████  ██   ██ ███████ ███████ 
*/}

<Modal 
              isVisible={editModalVisible}
              statusBarTranslucent={false}
              onBackButtonPress={editModalHandleCancel}
              onBackdropPress={editModalHandleCancel}
              animationType="slide"
              transparent={true}
              hardwareAccelerated
              onShow={editModalFocusPlatformName}
              >
              
              <View style={styles.modal.main}>
                <Text style={styles.modal.title}>Edit Record</Text>
                
                <Text style={styles.modal.label}>Platform:</Text>
                <TextInput 
                  returnKeyType="next" 
                  accessible={false} 
                  accessibilityLabel="Input Platform Name"
                  ref={editModalPlatformRef}
                  style={styles.modal.input} 
                  placeholder='Enter Platform name ' 
                  value={editModalNewPlatformName} 
                  onChangeText={setEditModalNewPlatformName} 
                  onSubmitEditing={editModalFocusUsername}
                  />
                
                <Text style={styles.modal.label}>User:</Text>
                <TextInput 
                  returnKeyType="next" 
                  accessible={true} 
                  accessibilityLabel="Input User Name" 
                  ref={editModalUsernameRef}
                  style={styles.modal.input} 
                  placeholder='Enter user name ' 
                  value={editModalNewUserName} 
                  onChangeText={setEditModalNewUserName} 
                  onSubmitEditing={editModalFocusPassword}
                />
                
                <Text style={styles.modal.label}>Password:</Text>
                <TextInput 
                  returnKeyType="done"
                  accessible={true} 
                  accessibilityLabel="Input Password" 
                  ref={editModalPasswordRef} 
                  style={styles.modal.input} 
                  placeholder='Enter password '
                  value={editModalNewPassword}
                  onChangeText={setEditModalNewPassword}
                  onSubmitEditing={editModalhandleSave}
                  />

                <View style={styles.modal.buttonView}>
                  <TouchableOpacity onPress={editModalHandleCancel} >
                    <Text style={styles.modal.buttonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity returnKeyType="send" accessible={true} accessibilityLabel="Input Password" onPress={editModalhandleSave} >
                    <Text style={styles.modal.buttonText}>Save</Text>
                  </TouchableOpacity>

                </View>

              </View>
            </Modal>

    </View>
  )
}

export default PasswordVault;