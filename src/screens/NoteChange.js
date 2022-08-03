import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import { Button, TextInput } from "react-native-paper";
import Screen from "../components/Screen";
import { Ionicons } from "@expo/vector-icons";

import { userFromDBContext, AppStateContext } from "../context/Context";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const NoteChange = ({ navigation }) => {
  const { userFromDB1, setUserFromDB1 } = useContext(userFromDBContext);
  const { user } = useContext(AppStateContext);

  const [note, setNote] = useState(userFromDB1.note);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      await updateDoc(doc(db, "users", user.email), {
        note: note,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Screen>
      <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
        change note
      </Text>
      <TextInput
        mode="outlined"
        label="note"
        multiline={true}
        outlineColor="black"
        activeOutlineColor="black"
        left={<TextInput.Icon name="account" />}
        style={{ marginVertical: 15 }}
        value={note}
        onChangeText={(n) => {
          setNote(n);
          if (n !== userFromDB1.note) {
            setDisabled(false);
          } else {
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
            let firstName = userFromDB1.firstName;
            let lastName = userFromDB1.lastName;
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

export default NoteChange;

const styles = StyleSheet.create({});
