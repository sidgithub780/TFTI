import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Screen from "../components/Screen";

import AccountNavigator from "../components/AccountNavigator";

const EventEditScreen = ({ navigation, route }) => {
  return (
    <Screen>
      <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 25 }}>
        edit event
      </Text>
      <AccountNavigator
        titleText="name"
        onPress={() => {
          navigation.navigate("Event Name Change", {
            event: route.params.event,
            eventID: route.params.eventID,
          });
        }}
        iconName="business-outline"
      />
      <AccountNavigator titleText="description" iconName="pencil-outline" />
      <AccountNavigator titleText="time" iconName="time-outline" />
    </Screen>
  );
};

export default EventEditScreen;

const styles = StyleSheet.create({});
