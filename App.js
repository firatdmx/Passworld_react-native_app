import "react-native-gesture-handler"
import React from "react";
import  {store} from "./src/app/store"
import { Provider } from 'react-redux'
import Router from "./src/Router";
import FlashMessage from "react-native-flash-message";

// import * as Keychain from 'react-native-keychain'; //pin için
// import AsyncStorage from '@react-native-async-storage/async-storage';

import AsyncStorage from "@react-native-async-storage/async-storage";



const App = () => {
  // AsyncStorage.clear();
  const getAll = async() => {
    const result = await AsyncStorage.getAllKeys()
    console.log("async storage: ", result)
    const dev = await AsyncStorage.getItem("dev@dev.com_isPinEnabled")
    const isBioEnabled = AsyncStorage.getItem("bioLoginEnabled")
    console.log("dev@dev.com_isPinEnabled: ", dev)
    console.log("dev@dev.com_isPinEnabled: ", dev)
  }
  getAll()


  return (
    <Provider store={store}>
      <Router />
      <FlashMessage style={{marginTop:20, elevation:4}} position="top" />
    </Provider>
  );
};

export default App;














