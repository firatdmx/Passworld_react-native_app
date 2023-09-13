import { Pressable, Text } from 'react-native'
import React from 'react'
import styles from './FloatingButton.styles.js'

const FloatingButton = ({pressAction, title}) => {
    return (
        <Pressable style={styles.container} onPress={pressAction}>
            {/* <Icon name="plus" color="white" size={30} /> */}
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

export default FloatingButton;