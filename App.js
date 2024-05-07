import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RoootNavigator from "./src/navigations/RootNavigator";
import {
  OriginContextProvider,
  DestinationContextProvider,
} from "./src/context/Contexts";

const App = () => {
  return (
    <DestinationContextProvider>
      <OriginContextProvider>
        <RoootNavigator />
      </OriginContextProvider>
    </DestinationContextProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
