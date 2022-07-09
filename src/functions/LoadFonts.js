import { LogBox } from "react-native";
import { useFonts } from "expo-font";

LogBox.ignoreLogs(["Overwriting fontFamily style attribute preprocessor"]);

export const LoadFonts = () => {
  return useFonts({
    "Axiforma-Regular": require("../assets/fonts/Axiforma-Regular.ttf"),
    "Axiforma-Bold": require("../assets/fonts/Axiforma-Bold.ttf"),
  });
};
