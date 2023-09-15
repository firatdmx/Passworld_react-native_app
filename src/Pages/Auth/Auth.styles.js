import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    main: {
        flex:1,
        backgroundColor:'magenta'
    },
    secondMain: {
        flex: 1,
        justifyContent: 'center',
        margin: 15,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    slogan: {
        fontWeight: 'bold', 
        fontSize: 80,
        fontFamily:"sans-serif-light",
        color: 'magenta',
        textAlign:'center',
        textShadowOffset: {width:5, height:1},
        textShadowRadius:0.1,
        textShadowColor:'cyan'        
    },
    textinp: {
        flex: 1, margin: 5, borderBottomWidth: 1
    },
    textinpRows: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal:15,
    },
    rowLabel: {
        fontWeight: 'bold', color: 'black'
    }
})