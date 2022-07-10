import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";

import Screen from "../components/Screen";

import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

import { Button } from "react-native-paper";

import { AppStateContext } from "../context/Context";

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AppStateContext);

  return (
    <Screen>
      <Text style={{ fontFamily: "Axiforma-Regular" }}>
        Welcome {user?.email}
      </Text>
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

export default HomeScreen;

const styles = StyleSheet.create({});
