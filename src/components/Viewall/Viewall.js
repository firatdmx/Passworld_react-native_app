import { View, TextInput, Pressable, Alert } from 'react-native'
import React from 'react'
import styles from './Viewall.styles.js'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { setrecordID } from '../../features/recordID/recordIDSlice.js'
import firestore from '@react-native-firebase/firestore';



const Viewall = ({data, refresh}) => {
    const veri = data.data()
    const navigation = useNavigation();

    const dispatch = useDispatch();

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
                console.log("datayi bul" , data["_data"])
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


    return (
        <Pressable 
            onPress={goToEditPage}
            onLongPress={handleDeleteAlert}
        >

        <View style={styles.mainView}>

            <View style={styles.title}>
                <TextInput editable={false} style={styles.titleText} value={veri["platform"]} />
            </View>

            <View style={styles.rowView}>
                <View style={styles.accountView}>
                    <TextInput editable={false} style={styles.accountText} value={veri["account"]}/>
                </View>

                <View>
                    <TextInput editable={false} style={styles.textText} value={veri["pass"]} />
                </View>
            </View>

        </View>
        </Pressable>
    )
}

export default Viewall;