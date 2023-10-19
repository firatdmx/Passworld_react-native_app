import "react-native-gesture-handler"
import React from "react";
import  {store} from "./src/app/store"
import { Provider } from 'react-redux'
import Router from "./src/Router";
import FlashMessage from "react-native-flash-message";
import useBiometrics from "./src/hooks/useBiometrics";


const App = () => {
  // useBiometrics()
  return (
    <Provider store={store}>
      <Router />
      <FlashMessage style={{marginTop:20}} position="top" />
    </Provider>
  );
};

export default App;














// import * as Keychain from 'react-native-keychain'; //pin için
// import AsyncStorage from '@react-native-async-storage/async-storage';
// AsyncStorage.clear();