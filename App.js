import "react-native-gesture-handler"
import React from "react";

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import DrawerLeft from "./src/components/DrawerLeft";

// const Drawer = createDrawerNavigator();


import  {store} from "./src/app/store"
import { Provider } from 'react-redux'
import Router from "./src/Router";

// const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;


