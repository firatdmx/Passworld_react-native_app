import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    mainView:{
        borderWidth:1,
        backgroundColor:'lightgray', 
        marginHorizontal:10, 
        marginVertical:5, 
        borderRadius:10
    },
    title:{
        padding:0,
        borderTopStartRadius:10,
        borderTopEndRadius:10,
        backgroundColor:'#f0f0f0',
        
    },
    titleText: {
        fontWeight:"bold", 
        color:'red',
        fontSize:16,
        lineHeight:16
    },
    rowView: {
        flexDirection:"row",
        marginBottom:0
    },
    accountView:{ 
        marginLeft:10
    },
    accountText:{
        fontWeight:"bold", 
        color:'black',
        fontSize:16
    },
    textText: {
        fontSize:16, 
        color:'darkblue'
    }
})