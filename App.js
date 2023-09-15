import "react-native-gesture-handler"
import React from "react";
import  {store} from "./src/app/store"
import { Provider } from 'react-redux'
import Router from "./src/Router";


const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;


