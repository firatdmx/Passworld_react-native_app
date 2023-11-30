import "react-native-gesture-handler"
import React from "react";
import  {store} from "./src/app/store"
import { Provider } from 'react-redux'
import Router from "./src/Router";
import FlashMessage from "react-native-flash-message";


const App = () => {
  return (
    <Provider store={store}>
      <Router />
      <FlashMessage style={{marginTop:20, elevation:4}} position="top" />
    </Provider>
  );
};

export default App;














