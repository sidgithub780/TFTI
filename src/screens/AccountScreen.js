import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";

import Screen from "../components/Screen";

import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

import { Button } from "react-native-paper";

import { userFromDBContext } from "../context/Context";

const AccountScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

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
      <Text style={{ fontFamily: "Axiforma-Regular", fontSize: 25 }}>
        welcome
      </Text>
      <Text>{JSON.stringify(userFromDB1)}</Text>
      <Button
        mode="contained"
        color="black"
        loading={loading}
        style={{ marginTop: 15 }}
        uppercase={false}
        onPress={async () => {
          setLoading(true);
          await signOut(auth);
          console.log("logged out");
          setLoading(false);
          navigation.navigate("Landing Screen");
        }}
      >
        <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
          sign out
        </Text>
      </Button>
    </Screen>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
