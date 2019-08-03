import "./Config";

import { I18nextProvider } from "react-i18next";
import React, { Component } from "react";
import { Provider } from "react-redux";
import codePush from "react-native-code-push";
import RootContainer from "./Containers/RootContainer";
import createStore from "./Redux";
import DebugConfig from "./Config/DebugConfig";
import I18n from "./Config/I18next";

const store = createStore();

class App extends Component {
  render() {
    return (
      <I18nextProvider i18n={I18n}>
        <Provider store={store}>
          <RootContainer />
        </Provider>
      </I18nextProvider>
    );
  }
}

let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };
const Main = DebugConfig.useCodePush ? codePush(codePushOptions)(App) : App;

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron ? console.tron.overlay(Main) : Main;
