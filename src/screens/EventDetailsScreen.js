import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";

import Screen from "../components/Screen";

import { Switch, Divider, Button } from "react-native-paper";

import Constants from "expo-constants";

import { doc, updateDoc, getDoc } from "firebase/firestore";

import { db } from "../firebase-config";

import { AppStateContext } from "../context/Context";

import { Ionicons } from "@expo/vector-icons";

const EventDetailsScreen = ({ route, navigation }) => {
  const { user } = useContext(AppStateContext);

  const [isSwitchOn, setIsSwitchOn] = React.useState(
    route.params.event.transparent
  );
  const [isSwitchOn1, setIsSwitchOn1] = React.useState(
    route.params.event.collaborative
  );

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const onToggleSwitch1 = () => setIsSwitchOn1(!isSwitchOn1);

  const handleConfirm = async () => {
    const eventRef = doc(db, "events", route.params.eventID);
    await updateDoc(eventRef, {
      transparent: isSwitchOn,
      collaborative: isSwitchOn1,
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 25 }}>
            event details
          </Text>
          <TouchableOpacity
            style={{ marginHorizontal: 30 }}
            onPress={() => {
              navigation.navigate("EventEdit");
            }}
          >
            <Ionicons name="pencil" size={25} />
          </TouchableOpacity>
        </View>
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
        {route.params.event.admins.includes(user.email) ? (
          <View>
            <View style={{ flexDirection: "row", marginTop: 30 }}>
              <Text style={styles.toggleText}>transparency mode:</Text>
              <Switch
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
                style={{ marginHorizontal: 10 }}
              />
            </View>
            <View style={{ flexDirection: "row", marginTop: 30 }}>
              <Text style={styles.toggleText}>collaborative mode:</Text>
              <Switch
                value={isSwitchOn1}
                onValueChange={onToggleSwitch1}
                style={{ marginHorizontal: 10 }}
              />
            </View>
            <Button
              mode="contained"
              color="black"
              uppercase={false}
              style={{ marginTop: 30 }}
              onPress={handleConfirm}
            >
              <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
                confirm
              </Text>
            </Button>
          </View>
        ) : null}
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
  toggleText: {
    fontFamily: "Axiforma-Regular",
    fontSize: 20,
  },
});
