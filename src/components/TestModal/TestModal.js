import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, {useState} from 'react'
import styles from './TestModal.styles.js'
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';

const TestModal = ({setVisibleProp}) => {


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
        // onSubmit();
      }


    const [modalVisible, setModalVisible] = useState(true)
    const [newPlatformName, setNewPlatformName] = useState("")
    const [newUserName, setNewUserName] = useState("")
    const [newPassword, setNewPassword] = useState("")


    return (
        <Modal 
        isVisible={modalVisible}
        statusBarTranslucent={true}
        onBackButtonPress={() => setModalVisible(!modalVisible)}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        animationType="fade"
        transparent={true}
        >
        
        <View style={styles.main}>
          <Text style={styles.title}>Add New Record</Text>
          <Text style={styles.label}>Platform:</Text>
          <TextInput style={styles.input} placeholder='Enter Platform name ' value={newPlatformName} onChangeText={setNewPlatformName} />
          <Text style={styles.label}>User:</Text>
          <TextInput style={styles.input} placeholder='Enter user name ' value={newUserName} onChangeText={setNewUserName} />
          <Text style={styles.label}>Password:</Text>
          <TextInput style={styles.input} placeholder='Enter password ' value={newPassword} onChangeText={setNewPassword} />

          <View style={styles.buttonView}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSave} >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>

          </View>

        </View>
      </Modal>
    )
}

export default TestModal;