import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashBoardPage from '../../Pages/PasswordVault'
import ProfilesPage from '../../Pages/Profiles'
import EditRecordPage from '../../Pages/EditRecord'

const Stack = createNativeStackNavigator();


const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName="Profiles" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Profiles" component={ProfilesPage} />
            <Stack.Screen name="Dashboard" component={DashBoardPage} />
            <Stack.Screen name="EditRecord" component={EditRecordPage} />
        </Stack.Navigator>
    )
}

export default AppStack;