import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        position: "absolute",
        width:70,
        height:70,
        bottom:20,
        right:20,
        backgroundColor:'orange',
        borderRadius:50,
        borderWidth:2,
        borderColor:'#d1d1d190',
        justifyContent:'center',
        alignItems:'center',
        shadowOffset: {width:10, height:10},
        shadowOpacity:1,
        shadowRadius:10,
        shadowColor:'black',
        elevation: 8
    },
    text: {
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
        fontSize:50,
    }
})