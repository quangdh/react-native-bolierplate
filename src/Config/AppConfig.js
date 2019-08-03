import { Platform } from "react-native";

const env = {
  dev: "dev",
  test: "test",
  stg: "stg",
  product: "product",
  local: "local"
};

const CODE_PUSH_KEY_IOS = {
  stg: "",
  product: ""
};

const CODE_PUSH_KEY_ANDROID = {
  stg: "",
  product: ""
};

const currentEnv = env.stg;
export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  currentEnv: currentEnv,
  codePushDeploymentKey: Platform.select({
    ios: CODE_PUSH_KEY_IOS[currentEnv],
    android: CODE_PUSH_KEY_ANDROID[currentEnv]
  })
};
