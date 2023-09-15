import {StyleSheet} from 'react-native';

const base_style = StyleSheet.create({
    buttonS: {
        padding:15,
        marginHorizontal:10,
        marginTop:10,
        backgroundColor:"gray",
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
    },
    buttonSText: {
        color: 'white', 
        fontSize: 20, 
        fontWeight: 'bold',
    },
})   

export default {
    gray: {
        ...base_style,
    
        buttonS: {
            ...base_style.buttonS,
        } 
    },
    orange:{
        ...base_style,

        buttonS: {
            ...base_style.buttonS,
            backgroundColor:'orange'
        }
    }
}
