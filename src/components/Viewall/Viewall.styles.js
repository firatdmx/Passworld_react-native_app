import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 5,
    padding: 0,
  },
  leftHandView: {
    flex: 1,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'blue',
    marginRight: 12,
  },
  avatarChar: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'white',
  },
  avatarAndInfo: {
    flexDirection: 'row',
    alignItems:'center',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBtn: {
    paddingHorizontal:20,
  },
  editBtnText:{
    color:'darkblue',
    fontWeight: 'bold',
    fontSize: 20,
  },
  showBtnText:{
    color:'brown',
    fontWeight: 'bold',
    fontSize: 20,
    marginRight:10
  },
  platformText: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: 'red',
    fontSize: 19,
    marginBottom: 12,
  },
    accountText: {
      fontWeight: 'bold',
      color: 'black',
      fontSize: 16,
    },
    passwdText: {
    fontSize: 16,
    color: 'darkblue',
    fontWeight:'600'
  },
});
