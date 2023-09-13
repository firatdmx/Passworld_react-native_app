import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    main: {
        flex:1,
    },
    secondMain: {
        flex: 1,
        justifyContent: 'center',
        margin: 30,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    slogan: {
        fontWeight: 'bold', fontSize: 30, color: 'black'
    },
    buttonS: {
        padding: 15,
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonSText: {
        color: 'white', fontSize: 20, fontWeight: 'bold'
    },
    textinp: {
        flex: 1, margin: 5, borderBottomWidth: 1
    },
    textinpRows: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rowLabel: {
        fontWeight: 'bold', color: 'black'
    }
})