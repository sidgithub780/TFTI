import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  FlatList,
  Platform,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { TextInput, Button } from "react-native-paper";

import Screen from "../components/Screen";

import RNDateTimePicker from "@react-native-community/datetimepicker";

import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase-config";

import { AppStateContext } from "../context/Context";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const CreateEventScreen = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [eventLocation, setEventLocation] = useState("");

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const onChange = (event, selectedDate, type) => {
    const currentDate = selectedDate || startDate;
    setShow(Platform.OS === "ios");

    setStartDate(currentDate);
  };

  const onChange1 = (event, selectedDate, type) => {
    const currentDate = selectedDate || endDate;
    setShow1(Platform.OS === "ios");

    setEndDate(currentDate);
  };

  const showMode = (currentMode, currentSelection) => {
    if (currentSelection === "start") {
      setShow(true);
    } else if (currentSelection === "end") {
      setShow1(true);
    }

    setMode(currentMode);
  };

  const showDatepicker = (currentSelection) => {
    showMode("date", currentSelection);
  };

  const showTimepicker = (currentSelection) => {
    showMode("time", currentSelection);
  };

  return (
    <ScrollView>
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

        {show && (
          <RNDateTimePicker
            value={startDate}
            mode={mode}
            display="default"
            onChange={onChange}
          />
        )}
        {show1 && (
          <RNDateTimePicker
            value={endDate}
            mode={mode}
            display="default"
            onChange={onChange1}
          />
        )}
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
            marginTop: 10,
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

        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontFamily: "Axiforma-Regular",
              fontSize: 15,
              marginTop: 10,
            }}
          >
            event location: {eventLocation}
          </Text>

          <Modal
            presentationStyle="pageSheet"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            style={{ backgroundColor: "black" }}
            animationType="slide"
          >
            <GooglePlacesAutocomplete
              placeholder="Search"
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true

                setEventLocation(data.description);
                setModalVisible(false);
              }}
              query={{
                key: "AIzaSyCjFx3bl1QEtoFoVF1zs0asjwDyKpuPJCI",
                language: "en",
              }}
              style={{ marginTop: 30 }}
            />

            <Button
              mode="contained"
              color="black"
              uppercase={false}
              onPress={() => {
                setModalVisible(false);
              }}
              style={{ marginHorizontal: 20, marginBottom: 30 }}
            >
              <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
                close
              </Text>
            </Button>
          </Modal>
        </View>
        <Button
          mode="contained"
          color="black"
          uppercase={false}
          onPress={async () => {
            try {
              setModalVisible(true);
            } catch (e) {
              console.log(e);
            }
          }}
          style={{ marginHorizontal: 20, marginTop: 20 }}
        >
          <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
            set location
          </Text>
        </Button>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text
            style={{
              fontFamily: "Axiforma-Regular",
              fontSize: 15,
              marginTop: 20,
            }}
          >
            start time:
          </Text>

          {Platform.OS === "android" ? (
            <>
              <Button
                mode="contained"
                color="black"
                uppercase={false}
                onPress={() => {
                  showDatepicker("start");
                }}
                style={{ marginHorizontal: 10 }}
              >
                <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
                  date
                </Text>
              </Button>

              <Button
                mode="contained"
                color="black"
                uppercase={false}
                onPress={() => {
                  showTimepicker("start");
                }}
              >
                <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
                  time
                </Text>
              </Button>
            </>
          ) : null}
        </View>
        {Platform.OS === "ios" ? (
          <RNDateTimePicker
            value={startDate}
            mode="datetime"
            onChange={(event, date) => {
              setStartDate(date);
            }}
          />
        ) : null}

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text
            style={{
              fontFamily: "Axiforma-Regular",
              fontSize: 15,
              marginTop: 20,
            }}
          >
            end time:
          </Text>

          {Platform.OS === "android" ? (
            <>
              <Button
                mode="contained"
                color="black"
                uppercase={false}
                onPress={() => {
                  showDatepicker("end");
                }}
                style={{ marginHorizontal: 10 }}
              >
                <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
                  date
                </Text>
              </Button>

              <Button
                mode="contained"
                color="black"
                uppercase={false}
                onPress={() => {
                  showTimepicker("end");
                }}
              >
                <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
                  time
                </Text>
              </Button>
            </>
          ) : null}
        </View>
        {Platform.OS === "ios" ? (
          <RNDateTimePicker
            value={endDate}
            mode="datetime"
            onChange={(event, date) => {
              setEndDate(date);
            }}
          />
        ) : null}

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
                location: eventLocation,
                transparent: false,
                collaborative: false,
                proposals: [],
                members: [
                  {
                    email: route.params.user.email,
                    attending: "attending",
                    firstName: route.params.user.firstName,
                    lastName: route.params.user.lastName,
                  },
                ],
                admins: [route.params.user.email],
              });
              console.log(docRef.id);

              const userRef = doc(db, "users", route.params.user.email);

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
      </Screen>
    </ScrollView>
  );
};

export default CreateEventScreen;

const styles = StyleSheet.create({});
