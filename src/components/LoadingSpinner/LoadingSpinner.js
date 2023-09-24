import { View, Text } from 'react-native'
import React from 'react'
import styles from './LoadingSpinner.styles.js'
import LottieView from "lottie-react-native";

const loaderSource =  "../../../src/assets/loader2.json"

const LoadingSpinner = ({msg}) => {
    return(
      <View style={styles.container}>
        <View style={styles.spinnerContainer}>

        <LottieView
            style={styles.spinner}
            autoPlay
            loop
            resizeMode="cover"
            autoSize
            source={require(loaderSource)}
            />
        </View>
        {/* burayı düzelt */}
        <View style={styles.textContainer}> 
        <Text style={styles.text}>{msg}</Text>
        </View>

      </View>
    )
  }

export default LoadingSpinner;