import HomeScreen from "../screens/HomeScreen";
import LandingScreen from "../screens/LandingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing Screen"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login Screen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup Screen"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
