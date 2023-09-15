import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashBoardPage from '../../Pages/DashBoard'
import ProfilesPage from '../../Pages/Profiles'
import EditRecordPage from '../../Pages/EditRecord'

const Stack = createNativeStackNavigator();


const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName="Profiles">
            <Stack.Screen name="Profiles" component={ProfilesPage} options={{headerShown:false}} />
            <Stack.Screen name="Dashboard" component={DashBoardPage} options={{headerShown:false}} />
            <Stack.Screen name="EditRecord" component={EditRecordPage} options={{headerShown:false}} />
        </Stack.Navigator>
    )
}

export default AppStack;