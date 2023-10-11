import "react-native-gesture-handler"
import React, { useEffect } from "react";
import  {store} from "./src/app/store"
import { Provider } from 'react-redux'
import Router from "./src/Router";
import * as Keychain from 'react-native-keychain'; //pin için
import FlashMessage from "react-native-flash-message";
// import AsyncStorage from '@react-native-async-storage/async-storage';



const App = () => {
  const savePin = async (pinVal) => {
    try {
      await Keychain.setGenericPassword('pin', pinVal, {service:"pinCode"});
      // console.log('PIN saved successfully.', pinVal);
    } catch (error) {
      console.error('Error saving PIN:', error);
    }
  };

  // useEffect(() => {
  //   savePin("1235")
  
  //   return () => {
  //     savePin("1235")
  //   }
  // }, [])

  // AsyncStorage.clear();
  

  return (
    <Provider store={store}>
      <Router />
      <FlashMessage style={{marginTop:20}} position="top" />
    </Provider>
  );
};

export default App;


