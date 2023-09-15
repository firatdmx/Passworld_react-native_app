import {StyleSheet, Dimensions} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default styles = StyleSheet.create({
    main: {flex:1,},
    title: {textAlign:'center', fontSize:30, color:'orange', fontWeight:'bold',textShadowColor: 'rgba(0, 0, 0, 0.75)', 
    textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10},
    addModal : {
        main : {alignSelf:'center', width:deviceWidth * 0.6 , height:deviceHeight * 0.15, backgroundColor:'white',borderRadius:15,padding:5},
        title: {textAlign:'center', fontWeight:'bold',fontSize:20,color:'red',marginTop:0,top:0},
        textinput: {borderWidth:1,borderRadius:2,padding:3,margin:5},
        buttonsView: {flexDirection:'row',justifyContent:'flex-end'},
        cancelBtnText: {fontWeight:'bold',marginRight:15, borderWidth:1,borderRadius:10,padding:5,backgroundColor:'red',color:'white'},
        addBtnText : {fontWeight:'bold',marginRight:15, borderWidth:1,borderRadius:10,padding:5,paddingHorizontal:15,backgroundColor:'green',color:'white'}
    },
    delModal: {
        main: {alignSelf:'center', width:deviceWidth * 0.6 , height:deviceHeight * 0.25, backgroundColor:'white', padding:5},
        confirmText: {textAlign:'center', fontWeight:'bold',fontSize:20,color:'red',marginTop:0,top:0},
        boldText: {fontWeight:"bold"},
        textInput: {borderWidth:1, width:"95%", height:"28%", margin:10,padding:10},
        btnProps: {alignItems:'center'},
        btnsView: {flexDirection:'row',justifyContent:'center'},
        cancelBtnText: {fontWeight:'bold',marginRight:15,marginTop:5, borderWidth:1,borderRadius:10,padding:5,backgroundColor:'gray',color:'white'},
        confirmBtnText: {fontWeight:'bold',marginRight:15,marginTop:5, borderWidth:1,borderRadius:10,padding:5,backgroundColor:'red',color:'white'}
    }

})