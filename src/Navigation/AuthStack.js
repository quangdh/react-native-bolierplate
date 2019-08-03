import {
    createStackNavigator,
  } from "react-navigation";
  import LaunchScreen from "../Screens/Startup/LaunchScreen";
  
  import styles from "./Styles/NavigationStyles";
  
  // Manifest of possible screens
  const AuthStack = createStackNavigator(
    {
      LaunchScreen: { screen: LaunchScreen }
    },
    {
      // Default config for all screens
      // headerMode: 'none',
      initialRouteName: "LaunchScreen",
      navigationOptions: {
        headerStyle: styles.header
      }
    }
  );
  
  export default AuthStack;
  