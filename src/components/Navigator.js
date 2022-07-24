import HomeScreen from "../screens/HomeScreen";
import LandingScreen from "../screens/LandingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import AccountScreen from "../screens/AccountScreen";
import CreateEventScreen from "../screens/CreateEventScreen";
import EventOptionsScreen from "../screens/EventOptionsScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import EventMembersScreen from "../screens/EventMembersScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";

import { AppStateContext } from "../context/Context";

import React, { useState, useMemo } from "react";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeToCreate = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Create"
        component={CreateEventScreen}
        options={{
          headerTransparent: true,
          headerBackTitle: "back",
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="EventOptions"
        component={EventOptionsScreen}
        options={{
          headerTransparent: true,
          headerBackTitle: "back",
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetailsScreen}
        options={{
          headerTransparent: true,
          headerBackTitle: "back",
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="EventMembers"
        component={EventMembersScreen}
        options={{
          headerTransparent: true,
          headerBackTitle: "back",
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const Main = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home Tab"
        screenOptions={{ tabBarColor: "transparent" }}
      >
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Home Tab"
          component={HomeToCreate}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <AppStateContext.Provider value={value}>
      <NavigationContainer>
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
            component={Main}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppStateContext.Provider>
  );
};

export default Navigator;
