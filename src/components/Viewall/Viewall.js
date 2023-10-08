import { View, Pressable, Alert, Text, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './Viewall.styles.js'
// import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { setrecordID } from '../../features/recordID/recordIDSlice.js'
import firestore from '@react-native-firebase/firestore';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';
import auth from '@react-native-firebase/auth'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Viewall = ({data, refresh, edit}) => {
  const [user, setUser] = useState("");




  const getCurrentUser = () => {
    const user = auth().currentUser;
    if (user) {
      // console.log(user.email); //print active user
      setUser(user.email)
      return user.email;
    } else {
      console.log('logged user not found');
      return false;
    }
  };


  useEffect(() => {
    getCurrentUser();
    // if (user) {retrieveEncryptionKey()}

    return () => {
      getCurrentUser();
    }
  }, [])

  const veri = data.data()
  // console.log("veri:", veri)

  // const navigation = useNavigation();

  const dispatch = useDispatch();
  const [passVisible, setPassVisible] = useState(false)

  const profile = useSelector((state) => state.profile.value)

  // const goToEditPage = () => {
  //     edit(data["platform"], data["account"], data["pass"])
  // }
  const goToEditPage = () => {
      // console.log("yo", data["id"])
      const recordID = data["id"]
      dispatch(setrecordID(recordID));
      // navigation.navigate("EditRecord", {recordID})
      edit()
  }

    const cancelDelete = () => {
        return false
    }

    const confirmDelete = () => {
        const recordID = data["id"]
            firestore()
            .collection('users')
            .doc(user)
            .collection("profiles")
            .doc(profile)
            .collection('records')
            .doc(recordID)
            .delete()
            .then(() => {
                // console.log("datayi bul" , data["_data"])
                const dt = data["_data"]
                const msg = "["+ dt["platform"] + ":" + dt["account"]  + "] entry has been deleted."
                // Alert.alert("Success", msg)
                ToastAndroid.show(msg, ToastAndroid.LONG)
                refresh()
            });
    }

    const handleDeleteAlert = () => {
        Alert.alert(
          'Confirmation',
          'Are you sure you want to delete the record?',
          [
            {
              text: 'No',
              onPress: cancelDelete,
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: confirmDelete,
            },
          ],
          { cancelable: false }
        );
      };
    
    const toggleShow = () => {
      setPassVisible(!passVisible)
    }

    const autoAsterisk = () => {
      setTimeout(() => {
        setPassVisible(false)
      }, 1000);
      return veri['pass']
    }


    const copyToClipboard = (textToCopy) => {
      Clipboard.setString(textToCopy)
      ToastAndroid.show("Copied to the clipboard!", ToastAndroid.SHORT)
      }

// ██████  ███████ ███    ██ ██████  ███████ ██████  
// ██   ██ ██      ████   ██ ██   ██ ██      ██   ██ 
// ██████  █████   ██ ██  ██ ██   ██ █████   ██████  
// ██   ██ ██      ██  ██ ██ ██   ██ ██      ██   ██ 
// ██   ██ ███████ ██   ████ ██████  ███████ ██   ██ 
    return (
      <View style={styles.container}>

        {/* ******************* LEFT SIDE START ******************* */}
        <View style={styles.leftHandView}>
            <View style={styles.avatarAndInfo}>
                    <Pressable onLongPress={handleDeleteAlert}>
                <View style={styles.avatarContainer}>
                        <Text style={styles.avatarChar}>{veri['platform'][0]}</Text>
                </View>
                    </Pressable>
                <View style={styles.infoContainer}>

                  <Text style={styles.platformText}>{veri['platform']}</Text>

                  <View style={styles.accountRow}>
                    <Text style={styles.accountText}>{veri['account']} </Text>
                    <TouchableHighlight underlayColor={"white"} style={styles.copyIcon} onPress={() => copyToClipboard(veri['account'])}>
                        <View>
                          <Icon name={"content-copy"} color={'black'} size={18} />
                        </View>
                      </TouchableHighlight>

                  </View>
                  
                  <View style={styles.passRow}>
                    <Text style={styles.passwdText}>{ passVisible? autoAsterisk() :  veri['pass'].slice(0,1) + "***" + veri['pass'].slice(-1) } </Text>
                      <TouchableHighlight underlayColor={"white"} style={styles.copyIcon} onPress={() => copyToClipboard(veri['pass'])}>
                        <View>
                          <Icon name={"content-copy"} color={'black'} size={18} />
                        </View>
                      </TouchableHighlight>
                  </View>
                
                </View>
            </View>
        </View>
        {/* ******************* LEFT SIDE END ******************* */}

        {/* ******************* RIGHT SIDE START ******************* */}
        <View style={styles.buttonContainer}>
            <Pressable style={styles.editBtn} onPress={goToEditPage}>
              <Icon name={"lead-pencil"} color={'black'} size={18} />
            </Pressable>

            <Pressable onPress={toggleShow}>
              <Icon style={styles.viewIcon} name={"eye"} color={'black'} size={18} />
            </Pressable>
        </View>
        {/* ******************* RIGHT SIDE END ******************* */}

      </View>
    );

}

export default Viewall;