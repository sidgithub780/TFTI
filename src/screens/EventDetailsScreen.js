import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState } from "react";

import Screen from "../components/Screen";

import { Switch, Divider } from "react-native-paper";

import Constants from "expo-constants";

const EventDetailsScreen = ({ route }) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [isSwitchOn1, setIsSwitchOn1] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const onToggleSwitch1 = () => setIsSwitchOn1(!isSwitchOn1);

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 25 }}>
          event details
        </Text>
        <Text style={styles.normalStyle}>{route.params.event.description}</Text>
        <Divider />
        <Text style={styles.normalStyle}>{route.params.event.location}</Text>
        <Divider />
        <Text style={styles.normalStyle}>
          attending: {route.params.event.attending}
        </Text>
        <Divider />
        <Text style={styles.normalStyle}>
          not attending: {route.params.event.notAttending}
        </Text>
        <Divider />
        <Text style={styles.normalStyle}>
          start:{" "}
          {new Date(
            route.params.event.startDate.seconds * 1000
          ).toLocaleDateString("en-US")}{" "}
          @{" "}
          {new Date(
            route.params.event.startDate.seconds * 1000
          ).toLocaleTimeString("en-US")}
        </Text>
        <Divider />
        <Text style={styles.normalStyle}>
          end:{" "}
          {new Date(
            route.params.event.endDate.seconds * 1000
          ).toLocaleDateString("en-US")}{" "}
          @{" "}
          {new Date(
            route.params.event.endDate.seconds * 1000
          ).toLocaleTimeString("en-US")}
        </Text>
        <Divider />
      </View>
      <View style={{ marginBottom: 40 }}>
        <View style={{ flexDirection: "row", marginTop: 30 }}>
          <Text style={styles.normalStyle}>transparency mode:</Text>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            style={{ marginHorizontal: 10 }}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 30 }}>
          <Text style={styles.normalStyle}>collaborative mode:</Text>
          <Switch
            value={isSwitchOn1}
            onValueChange={onToggleSwitch1}
            style={{ marginHorizontal: 10 }}
          />
        </View>
      </View>
    </View>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
  normalStyle: {
    fontFamily: "Axiforma-Regular",
    fontSize: 20,
    marginTop: 10,
    padding: 10,
  },
  container: {
    paddingTop:
      Constants.statusBarHeight + Dimensions.get("window").height / 15,
    marginHorizontal: Dimensions.get("window").width / 12.5,
    flex: 1,
    justifyContent: "space-between",
  },
});
