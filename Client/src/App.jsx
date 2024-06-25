import React from "react";
import Reg from "./containers/UserAuth/Reg";
import { Provider } from "react-redux";
import store from "./store";
import AllRouting from "./containers/AllRouting/AllRouting";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <AllRouting/>
        <Toaster/>
      </Provider>
    </div>
  );
};

export default App;
