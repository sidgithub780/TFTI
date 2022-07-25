import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";

import { Avatar, Button, Card } from "react-native-paper";

import Constants from "expo-constants";

import ButtonToggleGroup from "react-native-button-toggle-group";

import { doc, updateDoc, getDoc } from "firebase/firestore";

import { db } from "../firebase-config";

import * as Clipboard from "expo-clipboard";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const EventOptionsScreen = ({ route, navigation }) => {
  const [value, setValue] = React.useState("not attending");

  useEffect(() => {
    const load = async () => {
      const eventRef = doc(db, "events", route.params.eventID);
      const eventSnap = await getDoc(eventRef);

      if (eventSnap.data() !== undefined) {
        eventSnap.data().members.map((member) => {
          console.log(member.email);
          if (member.email === route.params.user.email) {
            console.log("we in");
            setValue(member.attending);
          }
        });
      }
    };
    load();
  }, []);

  const confirmSelection = async () => {
    const eventRef = doc(db, "events", route.params.eventID);
    const eventSnap = await getDoc(eventRef);
    console.log(eventSnap.data().members);
    let tempMembers = eventSnap.data().members;
    tempMembers.map((member) => {
      console.log(member.email);
      if (member.email === route.params.user.email) {
        console.log("we in");
        member.attending = value;
      }
    });
    await updateDoc(eventRef, {
      members: tempMembers,
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontFamily: "Axiforma-Bold",
            fontSize: 25,
          }}
        >
          {route.params.event.title}
        </Text>

        <Button
          mode="contained"
          color="black"
          uppercase={false}
          style={{ marginHorizontal: 5, marginTop: 10, width: "50%" }}
          onPress={async () => {
            await Clipboard.setStringAsync(route.params.eventID);
            alert("Copied");
          }}
        >
          <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
            copy id
          </Text>
        </Button>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EventDetails", {
              event: route.params.event,
              eventID: route.params.eventID,
            });
          }}
        >
          <Card style={{ marginTop: 20, padding: 10 }}>
            <Card.Title
              title="details"
              subtitle="view title, description, and settings"
              left={LeftContent}
            />
          </Card>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EventMembers", { event: route.params.event });
          }}
        >
          <Card style={{ marginTop: 20, padding: 10 }}>
            <Card.Title
              title="members"
              subtitle="view members"
              left={LeftContent}
            />
          </Card>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 0 }}>
        <Text
          style={{
            fontFamily: "Axiforma-Bold",
            fontSize: 25,
            marginBottom: 20,
          }}
        >
          change attendance status
        </Text>
        <Text
          style={{
            fontFamily: "Axiforma-Regular",
            fontSize: 15,
            marginBottom: 20,
          }}
        >
          currently selected: {value}
        </Text>
        <ButtonToggleGroup
          highlightBackgroundColor={"#5626CE"}
          highlightTextColor={"white"}
          inactiveBackgroundColor={"transparent"}
          inactiveTextColor={"grey"}
          values={["not attending", "maybe", "attending"]}
          value={value}
          onSelect={(val) => setValue(val)}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 10,
            padding: 5,
            height: "20%",
          }}
          textStyle={{ fontFamily: "Axiforma-Regular" }}
        />
        <Button
          mode="contained"
          color="black"
          uppercase={false}
          style={{ marginHorizontal: 5, marginTop: 25 }}
          onPress={confirmSelection}
        >
          <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
            confirm selection
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default EventOptionsScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop:
      Constants.statusBarHeight + Dimensions.get("window").height / 15,
    marginHorizontal: Dimensions.get("window").width / 12.5,
    flex: 1,
    justifyContent: "space-between",
  },
});
