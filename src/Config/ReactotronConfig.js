import Config from "../Config/DebugConfig";
import AsyncStore from "@react-native-community/async-storage";
import Immutable from "seamless-immutable";
import Reactotron from "reactotron-react-native";
import { reactotronRedux as reduxPlugin } from "reactotron-redux";
import sagaPlugin from "reactotron-redux-saga";

if (Config.useReactotron) {
  Reactotron.configure({ name: "Coffee App" })
    .useReactNative()
    .setAsyncStorageHandler(AsyncStore)
    .use(reduxPlugin({ onRestore: Immutable }))
    .use(sagaPlugin())
    .connect();

  Reactotron.clear();

  console.tron = Reactotron;
  console.log = Reactotron.log;
}
