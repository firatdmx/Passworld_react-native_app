import {StyleSheet, Dimensions} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default styles = StyleSheet.create({
    main:
    {
        flex:1,
    },
    floatingButtonView: 
    {
        flex:1,
        position:'absolute', 
        bottom:50, // bunun daha mantıklı bir yolunu bulmalıyım bence
        right:0,
        backgroundColor:"red"
    },
    title: 
    {
        marginTop:10,
        marginBottom:0,
        textAlign:'center', 
        fontWeight:'bold', 
        fontSize:40,
        color:'orange'
    },
    separator:
    {
        borderBottomWidth:0,borderStyle:'dotted'
    },
    searchBarContainer: 
    {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:"orange", 
        margin:15, 
        borderRadius:50,
        padding:5
    },
    searchBarTextInputView: 
    {
        flex:1,
        flexDirection:"column"
    },
    searchBarTextInput:
    {
        padding:10,
        paddingLeft:15,
        paddingBottom:0,
        fontSize:17,
        color:"white",
        fontWeight:'bold',
    },
    searchBarLine:
    {
        borderTopWidth:1,
        borderTopColor:'#ffffff99',
        marginHorizontal:15,
    },
    searchBarDelBtn:
    {
        marginRight:15,
        borderRadius:50
    },
    notFoundContainer:
    {
        backgroundColor:"lightblue",
        height:30,
        justifyContent:'center'
    },
    notFoundText:
    {
        textAlign:'center',
        fontWeight:'bold',
        color:'black'
    },



    modal: 
    {
        main: 
        {
            alignSelf:'center',
            width:deviceWidth * 0.7 ,//bunları gerçek responsive yap...
            height:deviceHeight * 0.35, //bunları gerçek responsive yap...
            backgroundColor:'white',
            padding:5,
            borderRadius:15,
        },
        title: 
        {
            textAlign:'center', 
            fontWeight:'bold',
            fontSize:22,
            color:'red',
            marginTop:0,
            top:0
        },
        input: 
        {
            borderWidth:1,
            borderRadius:2,
            padding:3,
            margin:5
        },
        label: 
        {
            fontWeight:'bold',
            fontSize:16,
            color:'black'
        },
        buttonView: 
        {
            flexDirection:'row',
            justifyContent:'flex-end',
        },
        buttonText: 
        {
            fontWeight:'bold',
            marginRight:15, 
            borderWidth:1,
            borderRadius:10,
            padding:5,
            backgroundColor:'red',
            color:'white'
        }
    }

})