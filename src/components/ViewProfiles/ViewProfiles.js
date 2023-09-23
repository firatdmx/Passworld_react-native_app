import React from 'react'
import { Pressable, View, Text } from 'react-native'
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
// ██████  ███████ ███    ██ ██████  ███████ ██████  
// ██   ██ ██      ████   ██ ██   ██ ██      ██   ██ 
// ██████  █████   ██ ██  ██ ██   ██ █████   ██████  
// ██   ██ ██      ██  ██ ██ ██   ██ ██      ██   ██ 
// ██   ██ ███████ ██   ████ ██████  ███████ ██   ██ 
    return (
        <Pressable 
            onPress={() => handleDispatch(profileName)}
            onLongPress={() => showProfileDeleteModal(profileName)}
            >

        <View>
            <View style={styles.main}>
                <Text style={styles.letter}>{profileName[0].toUpperCase()}</Text>
                <Text style={styles.title}>{profileName.toUpperCase()}</Text>
            </View>

        </View>

        </Pressable>
    )
}

export default ViewProfiles;