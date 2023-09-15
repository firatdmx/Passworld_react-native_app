import { View, Text, Pressable } from 'react-native'
import React from 'react'
import styles from './AuthButton.styles.js'

const AuthButton = ({action, text, theme="gray"}) => {
    return (
        <View>
        <Pressable
          onPress={action}
          style={styles[theme].buttonS}>
          <Text style={styles[theme].buttonSText}>
          {text}
          </Text>
        </Pressable>
      </View>
    )
}

export default AuthButton;