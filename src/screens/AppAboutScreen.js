import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import { Ionicons } from "@expo/vector-icons";

const AppAboutScreen = () => {
  return (
    <Screen>
      <Text
        style={{
          fontFamily: "Axiforma-Bold",
          fontSize: 100,
          alignSelf: "center",
        }}
      >
        tfti
      </Text>
      <Text
        style={{
          fontFamily: "Axiforma-Regular",
          fontSize: 20,
          alignSelf: "center",
        }}
      >
        tfti is a sleek event management system to streamline the rsvp process.
      </Text>
      <Text
        style={{
          fontFamily: "Axiforma-Regular",
          fontSize: 20,
          alignSelf: "center",
          marginTop: 10,
        }}
      >
        oftentimes, casual group plans that don't warrant a formal invite, but
        are important enough to not be drowned out by long group message threads
        are left dormant.
      </Text>
      <Text
        style={{
          fontFamily: "Axiforma-Bold",
          fontSize: 20,
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        siddhanth kumar
      </Text>
      <Text
        style={{
          fontFamily: "Axiforma-Regular",
          fontSize: 20,
          alignSelf: "center",
          marginTop: 10,
        }}
      >
        siddhanth is a passionate app developer who enjoys playing volleyball,
        spending time with friends, and learning new technologies.
      </Text>
      <Text
        style={{
          fontFamily: "Axiforma-Bold",
          fontSize: 20,
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        socials{" "}
      </Text>
      <View
        style={{ flexDirection: "row", alignSelf: "center", marginTop: 10 }}
      >
        <Ionicons name="logo-instagram" size={20} />
        <Text
          style={{
            fontFamily: "Axiforma-Regular",
            fontSize: 20,
            marginLeft: 10,
          }}
        >
          coming soon...
        </Text>
      </View>
    </Screen>
  );
};

export default AppAboutScreen;

const styles = StyleSheet.create({});
