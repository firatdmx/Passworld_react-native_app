import {StyleSheet} from 'react-native';


export default styles = StyleSheet.create({
    container:
    {
        flex:1, 
        justifyContent:'center', 
        alignItems:'center',
        backgroundColor:'transparent',
    
    },
    spinner:
    {
        position:'absolute',
        width:150,
        height: 120,
        backgroundColor:'transparent',
    },
    spinnerContainer:
    {
        width:100,
        height:120,
        backgroundColor:"transparent",
        justifyContent:'center',
        alignItems:'center'
    },
    textContainer: {
    },
    text:
    {
        fontWeight:'bold',
        fontSize:20,
        color:'orange'
    }

})