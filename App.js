import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthPage from "./Pages/Auth";
import DashBoardPage from "./Pages/DashBoard";
import ProfilesPage from "./Pages/Profiles";
import EditRecordPage from "./Pages/EditRecord";

import  {store} from "./src/app/store"
import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator();

const App = () => {
    return(
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={AuthPage} options={{headerShown:false}} />
                    <Stack.Screen name="Profiles" component={ProfilesPage} options={{headerShown:false}} />
                    <Stack.Screen name="Dashboard" component={DashBoardPage} options={{headerShown:false}} />
                    <Stack.Screen name="EditRecord" component={EditRecordPage} options={{headerShown:false}} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default App;