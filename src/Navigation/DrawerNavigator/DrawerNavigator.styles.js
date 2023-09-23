import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    avatarContainer:
    {
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: 'orange',
        borderWidth:1,
        alignSelf:'center',
        margin:10,
    },
    avatarChar:
    {
        flex:1,
        textAlign:'center',
        fontWeight:'bold',
        fontSize: 70,
        color: 'white'
    },
    infoText: 
    {
        fontSize:17,
        textAlign:'center',
        fontWeight:'bold',
        color:'black',
        marginBottom:5
    },
    drawerFooterContainer:
    {
        flex:1,
        justifyContent:'flex-end',
    },
    signOutBtn:
    {
        height:70,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center'
    },
    signOutBtnTextContainer:
    {
        flexDirection:'row',
        alignItems:'center'
    },
    signOutBtnText:
    {
        fontSize:20,
        fontWeight:'bold',
        color:'white',
    },
    drawerHeaderContainer: 
    {
        backgroundColor:"#white",
        borderTopRightRadius:50,
        borderBottomRightRadius:50,
        shadowOffset: {width: 5,height: 5},
        shadowRadius:3,
        shadowOpacity:1,
        elevation:10,
        shadowColor:'black',
    },
    drawerItemStyle:
    {
        display:"none",
        backgroundColor:'black',
    },
    drawerContentScroll: 
    {
        flex:1,
        paddingTop:"5%",
    }



})