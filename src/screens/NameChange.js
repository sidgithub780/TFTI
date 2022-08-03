import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import { Button, TextInput } from "react-native-paper";
import Screen from "../components/Screen";
import { Ionicons } from "@expo/vector-icons";

import { userFromDBContext, AppStateContext } from "../context/Context";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const NameChange = ({ navigation }) => {
  const { userFromDB1, setUserFromDB1 } = useContext(userFromDBContext);
  const { user } = useContext(AppStateContext);

  const [firstName, setFirstName] = useState(userFromDB1.firstName);
  const [lastName, setLastName] = useState(userFromDB1.lastName);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      await updateDoc(doc(db, "users", user.email), {
        firstName: firstName,
        lastName: lastName,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Screen>
      <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
        change name
      </Text>
      <TextInput
        mode="outlined"
        label="first name"
        outlineColor="black"
        activeOutlineColor="black"
        left={<TextInput.Icon name="account" />}
        style={{ marginVertical: 15 }}
        value={firstName}
        onChangeText={(n) => {
          setFirstName(n);
          if (n !== userFromDB1.firstName) {
            setDisabled(false);
          }

          if (
            n === userFromDB1.firstName &&
            lastName === userFromDB1.lastName
          ) {
            setDisabled(true);
          }
        }}
      />
      <TextInput
        mode="outlined"
        label="last name"
        outlineColor="black"
        activeOutlineColor="black"
        left={<TextInput.Icon name="account" />}
        style={{ marginBottom: 15 }}
        value={lastName}
        onChangeText={(n) => {
          setLastName(n);

          if (n !== userFromDB1.lastName) {
            setDisabled(false);
          }

          if (
            n === userFromDB1.lastName &&
            firstName === userFromDB1.firstName
          ) {
            setDisabled(true);
          }
        }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button
          mode="contained"
          color="white"
          style={{ width: "40%" }}
          uppercase={false}
          onPress={() => {
            navigation.navigate("Account Change");
          }}
        >
          <Ionicons name="play-back-outline" size={20} />
        </Button>
        <Button
          mode="contained"
          color="black"
          style={{ width: "40%" }}
          uppercase={false}
          disabled={disabled}
          loading={loading}
          onPress={async () => {
            setLoading(true);

            console.log("got userref");

            await handleSubmit();
            let email = userFromDB1.email;
            let events = userFromDB1.events;
            let note = userFromDB1.note;
            setUserFromDB1({
              email: email,
              events: events,
              note: note,
              firstName: firstName,
              lastName: lastName,
            });

            navigation.navigate("Account Change");
          }}
        >
          <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
            change
          </Text>
        </Button>
      </View>
    </Screen>
  );
};

export default NameChange;

const styles = StyleSheet.create({});
