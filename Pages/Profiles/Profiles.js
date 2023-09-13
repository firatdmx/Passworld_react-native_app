import { SafeAreaView, Text,Button, FlatList, View, TextInput, TouchableOpacity,Dimensions, Pressable } from 'react-native'
import React, {useState, useEffect, useCallback, BackHandler} from 'react'
import styles from './Profiles.styles.js'
import firestore from '@react-native-firebase/firestore';
import ViewProfiles from '../../src/components/ViewProfiles/ViewProfiles.js';
import Modal from 'react-native-modal';
import { useFocusEffect } from '@react-navigation/native';




const Profiles = ({navigation}) => {

    const deviceHeight = Dimensions.get('window').height;
    const deviceWidth = Dimensions.get('window').width;
    
    const [data, setData] = useState([])
    const [newProfileName, setNewProfileName] = useState("")

    const [verificationText, setVerificationText] = useState("")

    const [profileAddModalVisible, setProfileAddModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);


    const toggleProfileAddModal = () => {
      setProfileAddModalVisible(!profileAddModalVisible);
    };

    const toggleProfileDeleteModal = (gelenveri) => {
      setDeleteModalVisible(!deleteModalVisible);
      setNewProfileName(gelenveri)

    };

    const addProfile = async (profName) => {
      const profs = firestore().collection("profiles")
      profs.doc(profName).set({})
      setNewProfileName("")
      setProfileAddModalVisible(false);
      fetchProfiles();
    }
    
    const fetchProfiles = async () => {
        let i;
        try {
          const notes = await firestore().collection('profiles').get();
          const docs = notes.docs
          let docsData = []
          
          for (i=0; i< docs.length; i++) {
            docsData.push(docs[i].id)
          }

          setData(docsData)

        } catch (error) {
          console.error("Hata oluştu:", error);
        }
      }

    useEffect(() => {
      fetchProfiles();
    }, [])

    useFocusEffect(
      useCallback(
        () => {
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
        if (secprofil === verificationText) {
          firestore().collection("profiles").doc(secprofil).delete()
          setDeleteModalVisible(false)
          fetchProfiles();
          setVerificationText("")
        } 
        else {
          console.log("Verification failed.")
        }
      }


    return (
        <SafeAreaView>
          
          

            <Text 
              style={{textAlign:'center', fontSize:30, color:'orange', fontWeight:'bold',textShadowColor: 'rgba(0, 0, 0, 0.75)', 
              textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10}}>
                Choose a profile
            </Text>

            <FlatList data={data} renderItem={render} />
            <Button title='ADD' onPress={toggleProfileAddModal} />

            <Modal 
              isVisible={profileAddModalVisible}
              statusBarTranslucent={true}
              onBackButtonPress={() => setProfileAddModalVisible(false)}
              onBackdropPress={() => setProfileAddModalVisible(false)}
              animationType="fade"
              transparent={true}
              >
              
              <View style={{alignSelf:'center', width:deviceWidth * 0.6 , height:deviceHeight * 0.2, backgroundColor:'white'}}>
                <Text style={{textAlign:'center', fontWeight:'bold',fontSize:20,color:'red',marginTop:0,top:0}}>Add New Profile</Text>
                <Text>Profile Name:</Text>
                <TextInput style={{borderWidth:1,borderRadius:2,padding:3,margin:5}} placeholder='Enter a new profile name: ' value={newProfileName} onChangeText={setNewProfileName} />

                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                  <TouchableOpacity onPress={toggleProfileAddModal} style={{alignItems:'flex-end'}}>
                    <Text style={{fontWeight:'bold',marginRight:15, borderWidth:1,borderRadius:10,padding:5,backgroundColor:'red',color:'white'}}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => addProfile(newProfileName)} style={{alignItems:'flex-end'}}>
                    <Text style={{fontWeight:'bold',marginRight:15, borderWidth:1,borderRadius:10,padding:5,paddingHorizontal:15,backgroundColor:'green',color:'white'}}>Add</Text>
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
              
              <View style={{alignSelf:'center', width:deviceWidth * 0.6 , height:deviceHeight * 0.2, backgroundColor:'white', padding:5}}>
                <Text style={{textAlign:'center', fontWeight:'bold',fontSize:20,color:'red',marginTop:0,top:0}}>Are you sure?</Text>
                    <Text>To delete "{newProfileName}"" profile enter <Text style={{fontWeight:"bold"}}>"{newProfileName}"</Text> into the box below and confirm.</Text>
                    <TextInput style={{borderWidth:1, width:"95%", height:"28%", margin:10,padding:10}} value={verificationText} onChangeText={setVerificationText} />

                <View style={{flexDirection:'row',justifyContent:'center'}}>

                  <Pressable onPress={() => setDeleteModalVisible(false)} style={{alignItems:'center'}}>
                    <Text style={{fontWeight:'bold',marginRight:15,marginTop:5, borderWidth:1,borderRadius:10,padding:5,backgroundColor:'gray',color:'white'}}>Cancel</Text>
                  </Pressable>

                  <Pressable onPress={() => handleProfileDeleteAction(newProfileName)} style={{alignItems:'center'}}>
                    <Text style={{fontWeight:'bold',marginRight:15,marginTop:5, borderWidth:1,borderRadius:10,padding:5,backgroundColor:'red',color:'white'}}>Confirm</Text>
                  </Pressable>

                </View>

              </View>
            </Modal>
        </SafeAreaView>
    )
}

export default Profiles;