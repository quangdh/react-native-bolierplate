import React, { Component } from "react";
import { View } from "react-native";

// Styles
import styles from "./Styles/LaunchScreenStyles";

export default class LaunchScreen extends Component {
  static navigationOptions = ({ screenProps }) => ({
    headerTitle: screenProps.t("app_name")
  });

  render() {
    return <View style={styles.mainContainer} />;
  }
}
