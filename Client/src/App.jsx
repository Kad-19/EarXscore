import React from "react";
import Reg from "./containers/UserAuth/Reg";
import { Provider } from "react-redux";
import store from "./store";
import AllRouting from "./containers/AllRouting/AllRouting";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <AllRouting/>
      </Provider>
    </div>
  );
};

export default App;
