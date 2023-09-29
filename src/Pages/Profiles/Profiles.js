import { Text, FlatList, View, TextInput, TouchableOpacity, Pressable, Alert, ToastAndroid } from 'react-native'
import React, {useState, useCallback, useRef} from 'react'
import styles from './Profiles.styles.js'
import firestore from '@react-native-firebase/firestore';
import ViewProfiles from '../../components/ViewProfiles';
import Modal from 'react-native-modal';
import { useFocusEffect } from '@react-navigation/native';
import FloatingButton from '../../components/FloatingButton';
import { setProfile } from '../../features/profile/profileSlice.js'
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.js';

const Profiles = () => {

  const [loading, setLoading] = useState(false)

  const profileRef = useRef();
  const dispatch = useDispatch();

  const focusProfileName = () => {
    profileRef.current.focus()
  }
    
    const [data, setData] = useState([])
    const [selectedProfile, setSelectedProfile] = useState("")
    const [newProfileName, setNewProfileName] = useState("")

    const [verificationText, setVerificationText] = useState("")

    const [profileAddModalVisible, setProfileAddModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);


    const toggleProfileAddModal = () => {
      setProfileAddModalVisible(!profileAddModalVisible);
    };

    const toggleProfileDeleteModal = (profile_name) => {
      setDeleteModalVisible(!deleteModalVisible);
      setSelectedProfile(profile_name)

    };

    const addProfile = async (profName) => {
      if (profName && profName[0] != " ") {
        const profs = firestore().collection("profiles")
        profs.doc(profName).set({})
        setNewProfileName("")
        setProfileAddModalVisible(false);
        ToastAndroid.show("The profile '"+newProfileName.toUpperCase()+"' has been created successfully!.", ToastAndroid.LONG)
        fetchProfiles();
      } else {
        Alert.alert("Error", "Profile name cannot be empty and cannot begin with a space character.")
      }
    }
    
    const fetchProfiles = async () => {
      setLoading(true)
        let i;
        try {
          const notes = await firestore().collection('profiles').get();
          const docs = notes.docs
          let docsData = []
          
          for (i=0; i< docs.length; i++) {
            docsData.push(docs[i].id)
          }

          setData(docsData)
          setLoading(false)

        } catch (error) {
          console.error("Error:", error);
        }
      }

    useFocusEffect(
      useCallback(
        () => {
          dispatch(setProfile(null)) //remove profile selection
          fetchProfiles();
        },
        [],
      )
    )

      const render = ({item}) => {
        return(
            <ViewProfiles profileName={item} showProfileDeleteModal={toggleProfileDeleteModal} />
        )
      }


      const handleProfileDeleteAction = (secprofil) => {
        if (secprofil.toUpperCase() === verificationText.toUpperCase()) {
          firestore()
          .collection("profiles")
          .doc(secprofil)
          .delete()
          .then(
            setDeleteModalVisible(false),
            fetchProfiles(),
            setVerificationText(""),
            // Alert.alert("Success", "Profile has been deleted.")
            ToastAndroid.show("The profile '"+secprofil.toUpperCase()+"' has been deleted successfully!.", ToastAndroid.LONG)
          )
        } 
        else {
          console.log("Verification failed.")
        }
      }

      const handleModalCancel = () => {
        setProfileAddModalVisible(false)
        setSelectedProfile("")
      }


// ██████  ███████ ███    ██ ██████  ███████ ██████  
// ██   ██ ██      ████   ██ ██   ██ ██      ██   ██ 
// ██████  █████   ██ ██  ██ ██   ██ █████   ██████  
// ██   ██ ██      ██  ██ ██ ██   ██ ██      ██   ██ 
// ██   ██ ███████ ██   ████ ██████  ███████ ██   ██ 
    return (
      <View style={{flex:1,}}>
        {loading ? <LoadingSpinner msg={"Loading profiles"} /> :
         
        
        
        (

        <View style={styles.main}>

            <Text style={styles.title}>Choose a profile</Text>

            {data.length != 0 ? 
            <View style={{flex:1}}>
              <FlatList
                numColumns={2}
                data={data}
                renderItem={render}
                key={data}
                style={{paddingHorizontal:10}}
                />
            </View>

              :
              <View>
                <Text style={{color:'gray',fontWeight:'bold',fontSize:15}}>No profiles have been found...Please add a new profile.</Text>
              </View>
              }

            {/* floating button style duzenlenecek */}

            <Modal 
              isVisible={profileAddModalVisible}
              statusBarTranslucent={true}
              onBackButtonPress={handleModalCancel}
              onBackdropPress={handleModalCancel}
              animationType="fade"
              transparent={true}
              hardwareAccelerated
              onShow={focusProfileName}
              >
              
              <View style={styles.addModal.main}>
                <Text style={styles.addModal.title}>Add New Profile</Text>
                <Text>Profile Name:</Text>
                <TextInput ref={profileRef} style={styles.addModal.textinput} placeholder='Enter a new profile name: ' value={newProfileName} onChangeText={setNewProfileName} />

                <View style={styles.addModal.buttonsView} >
                  <TouchableOpacity onPress={handleModalCancel} >
                    <Text style={styles.addModal.cancelBtnText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => addProfile(newProfileName.toUpperCase())} >
                    <Text style={styles.addModal.addBtnText}>Add</Text>
                  </TouchableOpacity>


                </View>

              </View>
            </Modal>

            <Modal 
              isVisible={deleteModalVisible}
              statusBarTranslucent={true}
              onBackButtonPress={() => setDeleteModalVisible(false)}
              onBackdropPress={() => setDeleteModalVisible(false)}
              animationType="fade"
              transparent={true}
              >
              
              <View style={styles.delModal.main}>
                <Text style={styles.delModal.confirmText}>Are you sure?</Text>
                    <Text>To delete "{selectedProfile}"" profile enter <Text style={styles.delModal.boldText}>"{selectedProfile}"</Text> into the box below and confirm.</Text>
                    <TextInput style={styles.delModal.textInput} value={verificationText} onChangeText={setVerificationText} />

                <View style={styles.delModal.btnsView}>

                  <Pressable onPress={() => setDeleteModalVisible(false)} style={styles.delModal.btnProps}>
                    <Text style={styles.delModal.cancelBtnText}>Cancel</Text>
                  </Pressable>

                  <Pressable onPress={() => handleProfileDeleteAction(selectedProfile.toUpperCase())} style={styles.delModal.btnProps}>
                    <Text style={styles.delModal.confirmBtnText}>Confirm</Text>
                  </Pressable>

                </View>

              </View>
            </Modal>


            <View style={styles.floatingAddBtn}>
              <FloatingButton title={"+"} pressAction={toggleProfileAddModal} />
            </View>
        </View> )
      }


        </View>
    )
}

export default Profiles;