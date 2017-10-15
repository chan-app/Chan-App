import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import Store from "./Store";
import Router from "./Router";
import ThemeProvider from "./containers/ThemeProvider";

// TURN OFF WARNINGS
console.disableYellowBox = true;

const ChanApp = () => (
  <ReduxProvider store={Store}>
    <ThemeProvider>
      <ActionSheetProvider>
        <Router onNavigationStateChange={null} />
      </ActionSheetProvider>
    </ThemeProvider>
  </ReduxProvider>
);

export default ChanApp;
