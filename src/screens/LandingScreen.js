import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Constants from "expo-constants";
import React, { useEffect, useContext } from "react";

import { AppStateContext } from "../context/Context";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase-config";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

const LandingScreen = ({ navigation }) => {
  const { setUser } = useContext(AppStateContext);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        if (currentUser.emailVerified) {
          navigation.navigate("Home Screen");
        }
      }
    });
    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 40 }}>tfti</Text>
        <Text style={{ fontFamily: "Axiforma-Regular", fontSize: 30 }}>
          events made easy
        </Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login Screen");
          }}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Signup Screen");
            setUser({ name: "bozo" });
          }}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "Axiforma-Regular",
    fontSize: 20,
  },
  buttonStyle: {
    padding: 10,
  },
  buttonGroup: {
    alignItems: "center",
    paddingBottom: 150,
  },
  container: {
    paddingTop:
      Constants.statusBarHeight + Dimensions.get("window").height / 15,
    marginHorizontal: Dimensions.get("window").width / 12.5,
    flex: 1,
    justifyContent: "space-between",
  },
});
