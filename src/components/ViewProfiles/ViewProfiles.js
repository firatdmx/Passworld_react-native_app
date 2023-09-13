import { Pressable, View, Text } from 'react-native'
import React from 'react'
import styles from './ViewProfiles.styles.js'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setProfile } from '../../features/profile/profileSlice.js'


const ViewProfiles = ({profileName, showProfileDeleteModal}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();


    const handleDispatch = (veri) => {
        dispatch(setProfile(veri))
        navigation.navigate("Dashboard")
    }


    return (
        <Pressable 
            onPress={() => handleDispatch(profileName)}
            onLongPress={() => showProfileDeleteModal(profileName)}
            >

        <View>
            <View style={{backgroundColor:'orange',marginHorizontal:"35%",marginVertical:10,paddingVertical:10, borderWidth:1, borderRadius:10, justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontWeight:'bold',color:'black',fontSize:40, color:'white'}}>{profileName[0].toUpperCase()}</Text>
            <Text style={{fontWeight:'bold',color:'black'}}>{profileName.toUpperCase()}</Text>
            </View>

        </View>

        </Pressable>
    )
}

export default ViewProfiles;