import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import { Button, TextInput } from "react-native-paper";
import Screen from "../components/Screen";
import { Ionicons } from "@expo/vector-icons";

import { userFromDBContext, AppStateContext } from "../context/Context";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const SocialChange = ({ navigation }) => {
  const { userFromDB1, setUserFromDB1 } = useContext(userFromDBContext);
  const { user } = useContext(AppStateContext);

  const [email, setEmail] = useState(userFromDB1.email);
  const [instagram, setInstagram] = useState(userFromDB1.instagram);
  const [discord, setDiscord] = useState(userFromDB1.discord);
  const [phoneNumber, setPhoneNumber] = useState(userFromDB1.phoneNumber);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      await updateDoc(doc(db, "users", user.email), {
        email: email,
        instagram: instagram,
        discord: discord,
        phoneNumber: phoneNumber,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Screen>
      <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
        change socials
      </Text>
      <TextInput
        mode="outlined"
        label="email"
        outlineColor="black"
        activeOutlineColor="black"
        left={<TextInput.Icon name="email" />}
        style={{ marginVertical: 15 }}
        value={email}
        onChangeText={(n) => {
          setEmail(n);
          if (n !== userFromDB1.email) {
            setDisabled(false);
          }

          if (
            n === userFromDB1.email &&
            discord === userFromDB1.discord &&
            phoneNumber === userFromDB1.phoneNumber &&
            instagram === userFromDB1.instagram
          ) {
            setDisabled(true);
          }
        }}
      />
      <TextInput
        mode="outlined"
        keyboardType="number-pad"
        label="phone #"
        outlineColor="black"
        activeOutlineColor="black"
        left={<TextInput.Icon name="phone" />}
        style={{ marginVertical: 15 }}
        value={phoneNumber}
        onChangeText={(n) => {
          setPhoneNumber(n);
          if (n !== userFromDB1.phoneNumber) {
            setDisabled(false);
          }

          if (
            n === userFromDB1.phoneNumber &&
            discord === userFromDB1.discord &&
            email === userFromDB1.email &&
            instagram === userFromDB1.instagram
          ) {
            setDisabled(true);
          }
        }}
      />
      <TextInput
        mode="outlined"
        label="instagram"
        outlineColor="black"
        activeOutlineColor="black"
        left={<TextInput.Icon name="instagram" />}
        style={{ marginVertical: 15 }}
        value={instagram}
        onChangeText={(n) => {
          setInstagram(n);
          if (n !== userFromDB1.instagram) {
            setDisabled(false);
          }

          if (
            n === userFromDB1.instagram &&
            discord === userFromDB1.discord &&
            phoneNumber === userFromDB1.phoneNumber &&
            email === userFromDB1.email
          ) {
            setDisabled(true);
          }
        }}
      />
      <TextInput
        mode="outlined"
        label="discord"
        outlineColor="black"
        activeOutlineColor="black"
        left={<TextInput.Icon name="account" />}
        style={{ marginVertical: 15 }}
        value={discord}
        onChangeText={(n) => {
          setDiscord(n);
          if (n !== userFromDB1.discord) {
            setDisabled(false);
          }

          if (
            n === userFromDB1.discord &&
            email === userFromDB1.emai &&
            phoneNumber === userFromDB1.phoneNumber &&
            instagram === userFromDB1.instagram
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

            let events = userFromDB1.events;
            let firstName = userFromDB1.firstName;
            let lastName = userFromDB1.lastName;
            let note = userFromDB1.note;
            setUserFromDB1({
              email: email,
              events: events,
              note: note,
              firstName: firstName,
              lastName: lastName,
              discord: discord,
              instagram: instagram,
              phoneNumber: phoneNumber,
            });

            navigation.goBack();
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

export default SocialChange;

const styles = StyleSheet.create({});
