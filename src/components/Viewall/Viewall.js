import { View, Pressable, Alert, Text } from 'react-native'
import React, { useState } from 'react'
import styles from './Viewall.styles.js'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { setrecordID } from '../../features/recordID/recordIDSlice.js'
import firestore from '@react-native-firebase/firestore';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const Viewall = ({data, refresh}) => {
    const veri = data.data()
    const navigation = useNavigation();

    const dispatch = useDispatch();
    const [passVisible, setPassVisible] = useState(false)

    const profileValue = useSelector((state) => state.profile.value)

    const goToEditPage = () => {
        // console.log("yo", data["id"])
        const recordID = data["id"]
        dispatch(setrecordID(recordID));
        navigation.navigate("EditRecord", {recordID})
    }

    const cancelDelete = () => {
        return false
    }

    const confirmDelete = () => {
        const recordID = data["id"]
            firestore()
            .collection('profiles')
            .doc(profileValue)
            .collection('records')
            .doc(recordID)
            .delete()
            .then(() => {
                // console.log("datayi bul" , data["_data"])
                const dt = data["_data"]
                const msg = "["+ dt["platform"] + ":" + dt["account"]  + "] entry has been deleted."
                Alert.alert("Success", msg)
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
      }


    return (
      <View style={styles.container}>

        {/* ******************* LEFT SIDE START ******************* */}
        <View style={styles.leftHandView}>
            <View style={styles.avatarAndInfo}>
                <View style={styles.avatarContainer}>
                    <Pressable onLongPress={handleDeleteAlert}>
                        <Text style={styles.avatarChar}>{veri['platform'][0]}</Text>
                    </Pressable>
                </View>
                <View style={styles.infoContainer}>

                  <Text style={styles.platformText}>{veri['platform']}</Text>

                  <View style={{flexDirection:"row",}}>
                    <Text style={styles.accountText}>{veri['account']} </Text>
                    <TouchableHighlight underlayColor={"white"} style={{marginLeft:5, justifyContent:'center',alignItems:'center',borderRadius:10}} onPress={() => copyToClipboard(veri['account'])}>
                        <View>
                          <Icon  style={{marginRight:0}} name={"content-copy"} color={'black'} size={18} />
                        </View>
                      </TouchableHighlight>

                  </View>
                  
                  <View style={{flexDirection:"row",}}>
                    <Text style={styles.passwdText}>{ passVisible? autoAsterisk() :  veri['pass'].slice(0,1) + "***" + veri['pass'].slice(-1) } </Text>
                      <TouchableHighlight underlayColor={"white"} style={{marginLeft:5, justifyContent:'center',alignItems:'center',borderRadius:10}} onPress={() => copyToClipboard(veri['pass'])}>
                        <View>
                          <Icon  style={{marginRight:0}} name={"content-copy"} color={'black'} size={18} />
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
              <Icon style={{marginRight:0}} name={"lead-pencil"} color={'black'} size={18} />
            </Pressable>

            <Pressable onPress={toggleShow}>
              <Icon style={{marginRight:5}} name={"eye"} color={'black'} size={18} />
            </Pressable>
        </View>
        {/* ******************* RIGHT SIDE END ******************* */}

      </View>
    );

}

export default Viewall;






    // return (
    //     <View style={{flexDirection:"row",borderWidth:1,margin:10,borderRadius:10}}>
            
    //         <View style={{flex:5}}>

    //     <Pressable 
    //         onPress={goToEditPage}
    //         onLongPress={handleDeleteAlert}
    //     >

    //     <View style={styles.mainView}>

    //         <View style={styles.title}>
    //             <TextInput editable={false} style={styles.titleText} value={veri["platform"]} />
    //         </View>

    //         <View style={styles.rowView}>
    //             <View style={styles.accountView}>
    //                 <TextInput editable={false} style={styles.accountText} value={veri["account"]}/>
    //             </View>

    //             <View>
    //                 <TextInput editable={false} style={styles.textText} value={veri["pass"]} />
    //             </View>



    //         </View>

    //     </View>
    //     </Pressable>
    //     </View>
                
    //             <View style={{flex:1}}>

    //                 <View style={{flex:2,backgroundColor:'transparent'}} >
    //                     {/* burayi duzelt */}
    //                 </View>
                    
    //                 <View style={{flex:1, backgroundColor:'lightgray',justifyContent:'center',borderBottomRightRadius:10}}>
    //                     <Pressable onPress={() => console.log("TEST")}>
    //                         <Text style={styles.showHideBtnText}>(  o  )</Text>
    //                     </Pressable>
    //                 </View>
                    
    //             </View>
    //     </View>
    // )