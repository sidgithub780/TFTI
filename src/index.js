import {
  ActivityIndicator,
  AppState,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { LoadFonts } from "./functions/LoadFonts";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./components/Navigator";
import { StatusBar } from "expo-status-bar";

export default function App() {
  let [fontsLoaded] = LoadFonts();

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return <Navigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
