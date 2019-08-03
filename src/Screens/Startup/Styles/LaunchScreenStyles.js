import { StyleSheet } from "react-native";
import { Metrics, ApplicationStyles, Helpers } from "../../../Themes";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ...Helpers,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: "contain"
  },
  centered: {
    alignItems: "center"
  }
});
