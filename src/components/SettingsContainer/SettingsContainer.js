import { View, Text } from 'react-native'
import React from 'react'
import styles from './SettingsContainer.styles.js'

const SettingsContainer = ({title,content}) => {
    return (
    <View>
        <View>
            <Text style={{marginLeft:30,fontSize:15,fontWeight:'400',color:'gray'}}>{title.toUpperCase()}</Text>
        </View>
        <View style={{backgroundColor:'white',padding:5,margin:15,marginTop:5,borderRadius:10}}>
            {content}
        </View>
    </View>
    )
}

export default SettingsContainer;