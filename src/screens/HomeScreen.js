import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  RefreshControl,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";

import Screen from "../components/Screen";

import { AppStateContext, userFromDBContext } from "../context/Context";
import { getDoc, doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase-config";

import MyComponent from "../components/EventCard";

import { ActivityIndicator, TextInput, Button } from "react-native-paper";

import { Ionicons } from "@expo/vector-icons";

import uuid from "react-native-uuid";

const HomeScreen = ({ navigation }) => {
  const [userFromDB, setUserFromDB] = useState({});
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventCode, setEventCode] = useState("");
  const [userEventIDs, setUserEventIDs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useContext(AppStateContext);
  const { userFromDB1 } = useContext(userFromDBContext);
  //const usersCollectionRef = collection(db, "users");

  const reload = async () => {
    setRefreshing(true);
    const docRef = doc(db, "users", user.email);
    const docSnap = await getDoc(docRef);

    setUserFromDB({});
    setUserEvents([]);
    setUserEventIDs([]);

    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());

      setUserFromDB(docSnap.data());

      docSnap.data().events.map(async (eventID) => {
        setUserEventIDs((current) => [...current, eventID.trim()]);
        const eventRef = doc(db, "events", eventID);
        const eventSnap = await getDoc(eventRef);
        setUserEvents((current) => [...current, eventSnap.data()]);
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    setRefreshing(false);
  };

  const joinEvent = async () => {
    if (eventCode.length !== 0) {
      try {
        const eventRef = doc(db, "events", eventCode.trim());
        const eventSnap = await getDoc(eventRef);

        if (eventSnap.data() !== undefined) {
          const userRef = doc(db, "users", user.email);

          let currentEvents = userEventIDs;

          currentEvents.push(eventCode.trim());

          console.log(currentEvents);

          let currentMembers = eventSnap.data().members;
          currentMembers.push({
            email: user.email,
            attending: "maybe",
            firstName: userFromDB1.firstName,
            lastName: userFromDB1.lastName,
          });

          await updateDoc(eventRef, {
            members: currentMembers,
          });

          await updateDoc(userRef, {
            events: currentEvents,
          });

          setEventCode("");
          /*
          setUserEventIDs((current) => [...current, eventCode.trim()]);
          setUserEvents((current) => [...current, eventSnap.data()]);
          */
          reload();
        } else {
          alert("no event exists");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("type in an event code...");
    }

    setModalVisible(false);
  };

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data());

        if (docSnap.data() !== undefined) {
          setUserFromDB(docSnap.data());

          docSnap.data().events.map(async (eventID) => {
            setUserEventIDs((current) => [...current, eventID.trim()]);
            const eventRef = doc(db, "events", eventID);
            const eventSnap = await getDoc(eventRef);
            setUserEvents((current) => [...current, eventSnap.data()]);
          });
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      setLoading(false);
    };

    getUser();
  }, []);

  return (
    <Screen>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>enter event code:</Text>

            <TextInput
              mode="outlined"
              label="event code"
              outlineColor="black"
              activeOutlineColor="black"
              style={{ marginBottom: 15, marginTop: 5, width: "85%" }}
              onChangeText={(code) => {
                setEventCode(code);
              }}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={{ flexDirection: "row" }}>
              <Button
                mode="contained"
                color="black"
                uppercase={false}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={{ marginHorizontal: 5 }}
              >
                <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
                  cancel
                </Text>
              </Button>
              <Button
                mode="contained"
                color="black"
                uppercase={false}
                style={{ marginHorizontal: 5 }}
                onPress={joinEvent}
                loading={loading}
              >
                <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
                  submit
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {loading ? (
        <ActivityIndicator animating={loading} />
      ) : (
        <Text
          style={{
            fontFamily: "Axiforma-Bold",
            fontSize: 25,
          }}
        >
          {userFromDB.firstName}'s events
        </Text>
      )}

      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          justifyContent: "space-around",
        }}
      >
        <Button
          mode="contained"
          color="black"
          uppercase={false}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={{ marginHorizontal: 5 }}
        >
          <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
            join
          </Text>
        </Button>
        <Button
          mode="contained"
          color="black"
          uppercase={false}
          onPress={() => {
            navigation.navigate("Create", {
              ids: userEventIDs,
              user: userFromDB,
            });
          }}
          style={{ marginHorizontal: 5 }}
        >
          <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
            create
          </Text>
        </Button>
      </View>
      {loading ? <ActivityIndicator animated={loading} /> : null}
      {userEvents.length === 0 ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={reload} />
          }
        >
          <Text style={{ fontFamily: "Axiforma-Regular" }}>
            nothing to see here
          </Text>
        </ScrollView>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={reload} />
          }
        >
          {userEvents.map((event) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EventOptions", {
                    user: userFromDB,
                    event: event,
                    eventID: userEventIDs[userEvents.indexOf(event)],
                  });
                }}
              >
                <MyComponent
                  event={event}
                  user={user}
                  eventID={userEventIDs[userEvents.indexOf(event)]}
                />
              </TouchableOpacity>
            );
          })}

          <Text>{"\n \n \n \n \n \n"}</Text>
        </ScrollView>
      )}
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "85%",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    fontFamily: "Axiforma-Bold",
    fontSize: 20,
  },
});
