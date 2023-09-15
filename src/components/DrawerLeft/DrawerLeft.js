import { Pressable, Text } from 'react-native'
import React from 'react'
import styles from './DrawerLeft.styles.js'
import { useNavigation } from '@react-navigation/native';

const DrawerLeft = () => {
    const navigation = useNavigation();
    const openDrawer = () => {
        navigation.openDrawer();
      };

    return (
        <Pressable onPress={openDrawer}>
            <Text>OPEN</Text>
        </Pressable>
    )
}

export default DrawerLeft;