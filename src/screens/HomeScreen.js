import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";

import Screen from "../components/Screen";

import { AppStateContext } from "../context/Context";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

import { db } from "../firebase-config";

import MyComponent from "../components/EventCard";

import { ActivityIndicator, IconButton } from "react-native-paper";

import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [userFromDB, setUserFromDB] = useState({});
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  //const usersCollectionRef = collection(db, "users");

  const { user } = useContext(AppStateContext);

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data());
        setUserFromDB(docSnap.data());
        docSnap.data().events.map(async (eventID) => {
          console.log(eventID.trim());
          const eventRef = doc(db, "events", eventID);
          const eventSnap = await getDoc(eventRef);
          setUserEvents((current) => [...current, eventSnap.data()]);
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      setLoading(false);
    };

    getUser();
    console.log(userEvents);
  }, []);

  return (
    <Screen>
      {loading ? (
        <ActivityIndicator animated={loading} />
      ) : (
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "Axiforma-Bold",
                fontSize: 25,
              }}
            >
              {userFromDB.firstName}'s events
            </Text>
            <TouchableOpacity style={{ marginHorizontal: 30 }}>
              <Ionicons name="reload" size={30} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {userEvents.map((event) => {
              return <MyComponent event={event} />;
            })}
            <View>
              <Text>{"\n \n \n \n"}</Text>
            </View>
          </ScrollView>
        </View>
      )}
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
