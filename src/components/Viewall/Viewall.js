import { View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import styles from './Viewall.styles.js'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { setrecordID } from '../../features/recordID/recordIDSlice.js'

const Viewall = ({data}) => {
    const veri = data.data()
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const recordPressed = () => {
        // console.log("yo", data["id"])
        const recordID = data["id"]
        dispatch(setrecordID(recordID));
        navigation.navigate("EditRecord", {recordID})
    }

    return (
        <Pressable onPress={recordPressed}>

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