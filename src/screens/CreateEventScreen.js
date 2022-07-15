import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import React, { useState, useContext } from "react";
import { TextInput, Button } from "react-native-paper";

import Screen from "../components/Screen";

import DateTimePicker from "@react-native-community/datetimepicker";

import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase-config";

import { AppStateContext } from "../context/Context";

const CreateEventScreen = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { user } = useContext(AppStateContext);

  return (
    <KeyboardAvoidingView>
      <Screen>
        <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 25 }}>
          create event
        </Text>
        <Text
          style={{
            fontFamily: "Axiforma-Regular",
            fontSize: 15,
            marginTop: 20,
          }}
        >
          make an event to invite people to your event
        </Text>
        <Text
          style={{
            fontFamily: "Axiforma-Regular",
            fontSize: 15,
            marginTop: 30,
          }}
        >
          event name
        </Text>
        <TextInput
          mode="outlined"
          label="name your event"
          outlineColor="black"
          activeOutlineColor="black"
          style={{ marginBottom: 15, marginTop: 10 }}
          left={<TextInput.Icon name="domain" />}
          onChangeText={(name) => {
            setName(name);
          }}
        />
        <Text
          style={{
            fontFamily: "Axiforma-Regular",
            fontSize: 15,
            marginTop: 20,
          }}
        >
          event description
        </Text>
        <TextInput
          mode="outlined"
          label="describe your event"
          outlineColor="black"
          activeOutlineColor="black"
          style={{ marginBottom: 15, marginTop: 10 }}
          left={<TextInput.Icon name="lead-pencil" />}
          multiline={true}
          blurOnSubmit={true}
          onChangeText={(description) => {
            setDescription(description);
          }}
        />

        <Text
          style={{
            fontFamily: "Axiforma-Regular",
            fontSize: 15,
            marginTop: 20,
          }}
        >
          start time:
        </Text>
        <DateTimePicker
          value={startDate}
          mode="datetime"
          onChange={(startDate) => {
            setStartDate(startDate);
          }}
        />
        <Text
          style={{
            fontFamily: "Axiforma-Regular",
            fontSize: 15,
            marginTop: 30,
          }}
        >
          end time:
        </Text>
        <DateTimePicker
          value={endDate}
          mode="datetime"
          onChange={(endDate) => {
            setEndDate(endDate);
          }}
        />
        <Button
          mode="contained"
          color="black"
          uppercase={false}
          onPress={async () => {
            try {
              const docRef = await addDoc(collection(db, "events"), {
                title: name,
                description: description,
                startDate: startDate,
                endDate: endDate,
                attending: 1,
                maybeAttending: 0,
                notAttending: 0,
              });
              console.log(docRef.id);
              console.log(user);

              const userRef = doc(db, "users", user.email);

              let currentEvents = route.params.ids;
              console.log("currentevents");
              console.log(currentEvents);
              currentEvents.push(docRef.id);

              await updateDoc(userRef, {
                events: currentEvents,
              });

              navigation.navigate("Home");
            } catch (e) {
              console.log(e);
            }
          }}
          style={{ marginTop: 30 }}
        >
          <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
            create event
          </Text>
        </Button>
        <Text>{JSON.stringify(route.params.ids)}</Text>
      </Screen>
    </KeyboardAvoidingView>
  );
};

export default CreateEventScreen;

const styles = StyleSheet.create({});
