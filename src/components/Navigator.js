import HomeScreen from "../screens/HomeScreen";
import LandingScreen from "../screens/LandingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import AccountScreen from "../screens/AccountScreen";
import CreateEventScreen from "../screens/CreateEventScreen";
import EventOptionsScreen from "../screens/EventOptionsScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import EventMembersScreen from "../screens/EventMembersScreen";
import EventEditScreen from "../screens/EventEditScreen";
import AccountChangeScreen from "../screens/AccountChangeScreen";
import AppAboutScreen from "../screens/AppAboutScreen";
import NameChange from "../screens/NameChange";
import NoteChange from "../screens/NoteChange";
import SocialChange from "../screens/SocialChange";
import ViewProfileScreen from "../screens/ViewProfileScreen";
import EventDescriptionChange from "../screens/EventDescriptionChange";
import EventNameChange from "../screens/EventNameChange";
import EventTimeChange from "../screens/EventTimeChange";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";

import { AppStateContext, userFromDBContext } from "../context/Context";

import React, { useState, useMemo } from "react";

import { Ionicons } from "@expo/vector-icons";

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
          headerBackTitle: "Back",
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="EventOptions"
        component={EventOptionsScreen}
        options={{
          headerTransparent: true,
          headerBackTitle: "Back",
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetailsScreen}
        options={{
          headerTransparent: true,
          headerBackTitle: "Back",
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="EventEdit"
        component={EventEditScreen}
        options={{
          headerTransparent: true,
          headerBackTitle: "Back",
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="Event Name Change"
        component={EventNameChange}
        options={{
          headerTransparent: true,
          headerBackTitle: "Back",
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="Event Description Change"
        component={EventDescriptionChange}
        options={{
          headerTransparent: true,
          headerBackTitle: "Back",
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="Event Time Change"
        component={EventTimeChange}
        options={{
          headerTransparent: true,
          headerBackTitle: "Back",
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="EventMembers"
        component={EventMembersScreen}
        options={{
          headerTransparent: true,
          headerBackTitle: "Back",
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="View Profile"
        component={ViewProfileScreen}
        options={{
          headerTransparent: true,
          headerBackTitle: "Back",
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const [userFromDB1, setUserFromDB1] = useState({});
  const userFromDBValue = useMemo(
    () => ({ userFromDB1, setUserFromDB1 }),
    [userFromDB1, setUserFromDB1]
  );

  const AccountStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account Change"
          component={AccountChangeScreen}
          options={{
            headerTransparent: true,
            headerBackTitle: "Back",
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="App About"
          component={AppAboutScreen}
          options={{
            headerTransparent: true,
            headerBackTitle: "Back",
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="Name Change"
          component={NameChange}
          options={{
            headerTransparent: true,
            headerBackTitle: "Back",
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="Note Change"
          component={NoteChange}
          options={{
            headerTransparent: true,
            headerBackTitle: "Back",
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="Social Change"
          component={SocialChange}
          options={{
            headerTransparent: true,
            headerBackTitle: "Back",
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
    );
  };

  const Main = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home Tab"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home Tab") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Account Tab") {
              iconName = focused ? "person" : "person-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarColor: "transparent",
        })}
      >
        <Tab.Screen
          name="Account Tab"
          component={AccountStack}
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
    <userFromDBContext.Provider value={userFromDBValue}>
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
    </userFromDBContext.Provider>
  );
};

export default Navigator;
