import React, { Component } from "react";
import { View, Text } from "react-native";
import { withTranslation } from "react-i18next";
import SplashScreen from "react-native-splash-screen";

// Styles
import styles from "./Styles/LaunchScreenStyles";

class LaunchScreen extends Component {
  static navigationOptions = ({ screenProps }) => ({
    headerTitle: screenProps.t("app_name")
  });

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    const { t } = this.props;
    return (
      <View style={[styles.mainContainer, styles.fillCenter]}>
        <Text>{t("app_name")}</Text>
      </View>
    );
  }
}

export default withTranslation()(LaunchScreen);
