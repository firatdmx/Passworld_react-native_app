import { SafeAreaView, Text, Button, FlatList, TextInput, View } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import styles from './EditRecord.styles.js'
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';


const EditRecord = ({navigation}) => {
    const [data, setData] = useState(null);

const updateMethod = async () => {
    const certain = await firestore().collection('profiles').doc(profileValue).collection('records').doc(recordIDValue)
    .update({
        platform: platform,
        account: account,
        pass: password,
    });
    console.log(certain)
    navigation.goBack();
}


    useEffect(() => {

        if (data) {
            setPlatform(data["platform"])
            setAccount(data["account"])
            setPassword(data["pass"])
        }

    }, [data])

    useFocusEffect(
        useCallback(
          () => {
            getirrr();
          },
          [],
        )
        
    )
    

    const [platform, setPlatform] = useState(null);
    const [account, setAccount] = useState(null);
    const [password, setPassword] = useState(null);

    const profileValue = useSelector((state) => state.profile.value)
    const recordIDValue = useSelector((state) => state.recordID.value)
    
    const getirrr = async () => {
        let i;
        try {
          const notes = await firestore().collection('profiles').doc(profileValue).collection('records').doc(recordIDValue).get();
          setData(notes.data())

          console.log("data:  →", data)

        } catch (error) {
          console.error("Hata oluştu:", error);
        }
      }


    return (
        <SafeAreaView>
            <Text>Profile value → {profileValue}</Text>
            <Text>recordIDValue value → {recordIDValue}</Text>
            <Button title='GETIRRR' onPress={getirrr} />

            {data && (
                <View>

                    <Text>Platform: </Text> 
                    <TextInput style={{borderWidth:1,margin:10, marginTop:5}} value={platform} onChangeText={setPlatform} />

                    <Text>Account: </Text> 
                    <TextInput style={{borderWidth:1,margin:10, marginTop:5}} value={account} onChangeText={setAccount} />

                    <Text>Password: </Text>
                    <TextInput style={{borderWidth:1,margin:10, marginTop:5}} value={password} onChangeText={setPassword} />

                    <Button title={"SAVE"} onPress={updateMethod} />
                </View>
            ) }
        </SafeAreaView>
    )
}

export default EditRecord;