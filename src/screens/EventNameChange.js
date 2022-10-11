import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Screen from "../components/Screen";
import { TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const EventNameChange = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [theName, setTheName] = useState(route.params.event.title);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "events", route.params.eventID), {
        title: theName,
      });
      alert("changed!");
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  return (
    <Screen>
      <Text style={styles.titleText}>change event name</Text>
      <TextInput
        mode="outlined"
        label="event name"
        outlineColor="black"
        activeOutlineColor="black"
        left={<TextInput.Icon name="domain" />}
        style={{ marginBottom: 15, marginTop: 15 }}
        value={theName}
        onChangeText={(newName) => {
          setTheName(newName);
        }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button
          mode="contained"
          color="white"
          style={{ width: "40%" }}
          uppercase={false}
          onPress={() => {
            navigation.navigate("EventEdit");
          }}
        >
          <Ionicons name="play-back-outline" size={20} />
        </Button>
        <Button
          mode="contained"
          color="black"
          style={{ width: "40%" }}
          uppercase={false}
          loading={loading}
          onPress={async () => {
            await handleSubmit();
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

export default EventNameChange;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "Axiforma-Bold",
    fontSize: 25,
  },
});
