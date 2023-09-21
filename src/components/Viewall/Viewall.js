import { View, Pressable, Alert, Text } from 'react-native'
import React, { useState } from 'react'
import styles from './Viewall.styles.js'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { setrecordID } from '../../features/recordID/recordIDSlice.js'
import firestore from '@react-native-firebase/firestore';
import { TouchableHighlight } from 'react-native-gesture-handler';



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
                    <TouchableHighlight underlayColor={"orange"} style={{marginLeft:10, justifyContent:'center',alignItems:'center'}} onPress={() => console.log(veri['account'])}><Text style={{alignSelf:'center'}}>[c]</Text></TouchableHighlight> 
                  </View>
                  
                  <View style={{flexDirection:"row",}}>
                    <Text style={styles.passwdText}>{ passVisible? autoAsterisk() :  veri['pass'].slice(0,1) + "***" + veri['pass'].slice(-1) } </Text>
                      <TouchableHighlight underlayColor={"orange"} style={{marginLeft:10, justifyContent:'center',alignItems:'center'}} onPress={() => console.log(veri['pass'])}><Text style={{alignSelf:'center'}}>[c]</Text></TouchableHighlight>
                  </View>
                
                </View>
            </View>
        </View>
        {/* ******************* LEFT SIDE END ******************* */}

        {/* ******************* RIGHT SIDE START ******************* */}
        <View style={styles.buttonContainer}>
            <Pressable style={styles.editBtn} onPress={goToEditPage}>
              <Text style={styles.editBtnText}>Edit</Text>
            </Pressable>

            <Pressable onPress={toggleShow}>
              <Text style={styles.showBtnText}>Show</Text>
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