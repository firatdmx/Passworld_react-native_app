import AuthPage from '../../Pages/Auth'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName="AuthScreen">
            <Stack.Screen name="AuthScreen" component={AuthPage} options={{headerShown:false}} />
        </Stack.Navigator>
    )
}

export default AuthStack;