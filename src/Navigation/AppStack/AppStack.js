import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfilesPage from '../../Pages/Profiles'
import PasswordVaultPage from '../../Pages/PasswordVault'
import EditRecordPage from '../../Pages/EditRecord'
import SettingsPage from '../../Pages/Settings'
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName="Profiles" screenOptions={headerstyle.main}>
            <Stack.Screen name="Profiles" options={{headerTitle:"Password Vault",}} component={ProfilesPage} />
            <Stack.Screen name="PasswordVault" options={{headerTitle:"Password Vault"}} component={PasswordVaultPage} />
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