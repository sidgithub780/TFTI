import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

import { ActivityIndicator } from "react-native-paper";

import Screen from "../components/Screen";

import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase-config";

const ViewProfileScreen = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [allUserData, setAllUserData] = useState({});

  useEffect(() => {
    const getIt = async () => {
      setLoading(true);
      const docRef = doc(db, "users", route.params.member.email);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      setAllUserData(docSnap.data());
      setLoading(false);
    };

    getIt();
  }, []);

  return (
    <Screen>
      <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
        view account
      </Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text>{JSON.stringify(allUserData)}</Text>
      )}
    </Screen>
  );
};

export default ViewProfileScreen;

const styles = StyleSheet.create({});
