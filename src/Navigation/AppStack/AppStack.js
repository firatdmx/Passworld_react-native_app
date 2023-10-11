import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfilesPage from '../../Pages/Profiles'
import PasswordVaultPage from '../../Pages/PasswordVault'
import EditRecordPage from '../../Pages/EditRecord'
import SettingsPage from '../../Pages/Settings'
import { Pressable, StyleSheet, Text,TouchableHighlight} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

const headerRightFnc = () => {
    return (<TouchableHighlight onPress={() => console.log("test")}><Text>Test</Text></TouchableHighlight>)
}

const headerMenuIcon = () => {
    const navigation = useNavigation();

    return(
        <Pressable onPress={() => navigation.openDrawer()}>
            <Icon name={"menu"} color={'white'} size={30} style={{marginRight:10,marginLeft:-5}}/>
        </Pressable>
    )
}

const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName="Profiles" screenOptions={headerstyle.main}>
            <Stack.Screen name="Profiles" options={{headerTitle:"Password Vault",headerLeft:headerMenuIcon,headerRight:headerRightFnc}} component={ProfilesPage} />
            <Stack.Screen name="PasswordVault" options={{headerTitle:"Password Vault",headerLeft:headerMenuIcon}} component={PasswordVaultPage} />
            <Stack.Screen name="EditRecord" component={EditRecordPage} />
            <Stack.Screen name="Settings" component={SettingsPage} />
        </Stack.Navigator>
    )
}


export default AppStack;


export const headerstyle = StyleSheet.create({
    main: 
    {
        marginTop:30,
        headerShown:true,
        navigationBarColor:"#128c7e",
        statusBarColor:"#128c7e",
        headerTintColor:"white",
        headerStyle:
        {
            marginTop:30,
            backgroundColor:"#128c7e",
        }
    }
})