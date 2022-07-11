import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";

import Screen from "../components/Screen";

import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

import { Button } from "react-native-paper";

import { AppStateContext } from "../context/Context";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

import { db } from "../firebase-config";

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [userFromDB, setUserFromDB] = useState([]);

  //const usersCollectionRef = collection(db, "users");

  const { user } = useContext(AppStateContext);

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUserFromDB(docSnap.data().firstName);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };

    getUser();
  }, []);

  return (
    <Screen>
      <Text style={{ fontFamily: "Axiforma-Regular" }}>
        Welcome {userFromDB}
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
