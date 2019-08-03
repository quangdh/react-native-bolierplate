import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LaunchScreen from "../Screens/Startup/LaunchScreen";

import styles from "./Styles/NavigationStyles";
import UnAuthStack from "./UnAuthStack";
import AuthStack from "./AuthStack";

// Manifest of possible screens
const PrimaryNav = createSwitchNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    UnAuthStack,
    AuthStack
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "LaunchScreen",
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default createAppContainer(PrimaryNav);
