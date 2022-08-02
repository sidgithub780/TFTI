import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";

import Screen from "../components/Screen";

import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

import { Button } from "react-native-paper";

import { userFromDBContext } from "../context/Context";

import { Ionicons } from "@expo/vector-icons";

import AccountNavigator from "../components/AccountNavigator";

const AccountScreen = ({ navigation }) => {
  const { userFromDB1 } = useContext(userFromDBContext);

  return (
    <Screen>
      <Text
        style={{
          fontFamily: "Axiforma-Regular",
          fontSize: 20,
          marginBottom: 5,
        }}
      >
        welcome
      </Text>
      <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 25 }}>
        {userFromDB1.firstName}!
      </Text>

      <AccountNavigator
        titleText="account"
        onPress={() => {
          navigation.navigate("Account Change");
        }}
        iconName="person"
      />
      <AccountNavigator
        titleText="about"
        onPress={() => {
          navigation.navigate("App About");
        }}
        iconName="information-circle-outline"
      />
    </Screen>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  rowStyle: {
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "black",
  },
  touchableStyle: { marginVertical: 10 },
});
