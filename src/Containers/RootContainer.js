import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { connect } from "react-redux";
import CodePush from "react-native-code-push";
import ReduxNavigation from "../Navigation/ReduxNavigation";
import StartupActions from "../Redux/Startup/Actions";
import ReduxPersist from "../Config/ReduxPersist";
import AppConfig from "../Config/AppConfig";
import DebugConfig from "../Config/DebugConfig";

// Styles
import styles from "./Styles/RootContainerStyles";

class RootContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      progess: 0
    };
  }

  componentDidMount() {
    //Handle redux persist
    if (!ReduxPersist.active) this.props.startup();
    //Check update code-push
    if (DebugConfig.useCodePush) this.checkForAppUpdate();
  }

  checkForAppUpdate() {
    CodePush.sync(
      {
        rollbackTimeout: 30000,
        deploymentKey: AppConfig.codePushDeploymentKey,
        installMode: CodePush.InstallMode.ON_NEXT_RESTART
      },
      (onSyncStatusChange = syncStatus => {
        switch (syncStatus) {
          case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
            console.log("[Codepush] syncStutus 1: ", "CHECKING_FOR_UPDATE");
            this.setState({ status: "CHECKING_FOR_UPDATE ..." });
            break;
          case CodePush.SyncStatus.AWAITING_USER_ACTION:
            console.log("[Codepush] syncStutus 2: ", "AWAITING_USER_ACTION");
            this.setState({ status: "AWAITING_USER_ACTION ..." });
            break;
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            console.log("[Codepush] syncStutus 3: ", "DOWNLOADING_PACKAGE");
            this.setState({ status: "DOWNLOADING_PACKAGE ..." });
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            console.log("[Codepush] syncStutus 4: ", "INSTALLING_UPDATE");
            this.setState({ status: "INSTALLING_UPDATE ..." });
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            console.log("[Codepush] syncStutus 5: ", "UPDATE_INSTALLED");
            this.setState({ status: "UPDATE_INSTALLED ..." });
            break;
          case CodePush.SyncStatus.SYNC_IN_PROGRESS:
            console.log("[Codepush] syncStutus 6: ", "SYNC_IN_PROGRESS");
            this.setState({ status: "SYNC_IN_PROGRESS ..." });
            break;
          case CodePush.SyncStatus.UP_TO_DATE:
            console.log("[Codepush] syncStutus 7: ", "UP_TO_DATE");
            this.setState({ status: "UP_TO_DATE ..." });
            break;
          case CodePush.SyncStatus.UNKNOWN_ERROR:
            console.log("[Codepush] syncStutus 8: ", "UNKNOWN_ERROR");
            this.setState({ status: "UNKNOWN_ERROR ..." });
            break;
          default:
            console.log("[Codepush] syncStutus 9: ", syncStatus);
            this.setState({ status: syncStatus });
            break;
        }
      }),
      (onDownloadProgress = downloadProgress => {
        if (downloadProgress) {
          console.log(
            "Downloading " +
              downloadProgress.receivedBytes +
              " of " +
              downloadProgress
          );
          this.setState({ progess: downloadProgress });
        }
      }),
      (onError = error => {
        console.log("[Codepush] syncStutus: Error", error);
      })
    );
  }

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle="light-content" />
        <ReduxNavigation />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup())
});

export default connect(
  null,
  mapDispatchToProps
)(RootContainer);
