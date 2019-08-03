module.exports = {
  dependencies: {
    "react-native-device-info": {
      platforms: {
        android: {
          packageInstance: "new RNDeviceInfo(false)"
        }
      }
    },
    "react-native-code-push": {
      platforms: {
        android: null,
        ios: null
      }
    }
  }
};
