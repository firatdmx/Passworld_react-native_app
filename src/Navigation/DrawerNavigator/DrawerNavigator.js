import React from 'react';
import {View, Button} from "react-native"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="DrawerHome" screenOptions={{}}>
      <Drawer.Screen name="DrawerHome" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;


const HomeScreen = () => {
    const navigation = useNavigation();
  
    const openDrawer = () => {
      navigation.openDrawer();
    };
  
    return (
      <View>
        <Button title="Open Drawer" onPress={openDrawer} />
        {/* Your screen content */}
      </View>
    );
  };