import {StyleSheet, Dimensions} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default styles = StyleSheet.create({
    main:{flex:1,
    },
    floatingButtonView: {
        flex:1,
    },
    title: {
        textAlign:'center', 
        fontWeight:'bold', 
        fontSize:30,
        color:'orange'
    },
    modal: {
        main: {
            alignSelf:'center',
            width:deviceWidth * 0.7 ,
            height:deviceHeight * 0.31,
            backgroundColor:'white',
            padding:5,
            borderRadius:15,
        },
        title: {
            textAlign:'center', 
            fontWeight:'bold',
            fontSize:22,
            color:'red',
            marginTop:0,
            top:0
        },
        input: {
            borderWidth:1,
            borderRadius:2,
            padding:3,
            margin:5
        },
        label: {
            fontWeight:'bold',
            fontSize:16,
            color:'black'
        },
        buttonView: {
            flexDirection:'row',
            justifyContent:'flex-end',
        },
        buttonText: {
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