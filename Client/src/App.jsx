import React from "react";
import Reg from "./containers/UserAuth/Reg";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Reg />
      </Provider>
    </div>
  );
};

export default App;
