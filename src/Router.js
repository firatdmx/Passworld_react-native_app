import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import AuthPage from './Pages/Auth/'

import DashBoardPage from './Pages/DashBoard'
import ProfilesPage from './Pages/Profiles';
import EditRecordPage from './Pages/EditRecord';


const Stack = createNativeStackNavigator();

const Router = () => {
    const [user, setUser] = useState(auth().currentUser);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((authenticatedUser) => {
          setUser(authenticatedUser);
        });
    
        // Clean up the subscription when the component unmounts
        return unsubscribe;
      }, []);


    return (
        <NavigationContainer>

            {user ?
                <Stack.Navigator initialRouteName="Profiles">
                    <Stack.Screen name="Profiles" component={ProfilesPage} options={{headerShown:false}} />
                    <Stack.Screen name="Dashboard" component={DashBoardPage} options={{headerShown:false}} />
                    <Stack.Screen name="EditRecord" component={EditRecordPage} options={{headerShown:false}} />
                </Stack.Navigator>
            
            : 
            
                <Stack.Navigator initialRouteName="AuthScreen">
                    <Stack.Screen name="AuthScreen" component={AuthPage} options={{headerShown:false}} />
                </Stack.Navigator>
            }

        </NavigationContainer>
    )
}

export default Router;