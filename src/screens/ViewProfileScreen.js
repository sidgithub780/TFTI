import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

import { ActivityIndicator } from "react-native-paper";

import Screen from "../components/Screen";

import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase-config";

import { Ionicons } from "@expo/vector-icons";

import AccountNavigator from "../components/AccountNavigator";

const ViewProfileScreen = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [allUserData, setAllUserData] = useState({});

  useEffect(() => {
    const getIt = async () => {
      setLoading(true);
      const docRef = doc(db, "users", route.params.member.email);
      const docSnap = await getDoc(docRef);
      setAllUserData(docSnap.data());
      setLoading(false);
    };

    getIt();
  }, []);

  return (
    <Screen>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
            {allUserData.firstName} {allUserData.lastName}
          </Text>
          <Text style={{ fontFamily: "Axiforma-Regular", fontSize: 15 }}>
            {allUserData.note}
          </Text>

          {allUserData.email !== null && allUserData.email !== "" ? (
            <AccountNavigator titleText={allUserData.email} iconName="mail" />
          ) : null}

          {allUserData.phoneNumber !== null &&
          allUserData.phoneNumber !== "" ? (
            <AccountNavigator
              titleText={allUserData.phoneNumber}
              iconName="call"
            />
          ) : null}
          {allUserData.instagram !== null && allUserData.instagram !== "" ? (
            <AccountNavigator
              titleText={allUserData.instagram}
              iconName="logo-instagram"
            />
          ) : null}
          {allUserData.discord !== null && allUserData.discord !== "" ? (
            <AccountNavigator
              titleText={allUserData.discord}
              iconName="people-circle-outline"
            />
          ) : null}

          <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
            mutual events
          </Text>
        </View>
      )}
    </Screen>
  );
};

export default ViewProfileScreen;

const styles = StyleSheet.create({
  normalText: { fontSize: 20, fontFamily: "Axiforma-Regular" },
});
