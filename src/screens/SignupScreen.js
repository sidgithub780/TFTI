import { Button, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { StyleSheet, Text, TextInputComponent, View } from "react-native";

import Screen from "../components/Screen";
//import { signup } from '../functions/FirebaseFunctions';

const SignupScreen = () => {
  const [loading, setLoading] = useState(false);

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <Screen>
      <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 40 }}>signup</Text>

      <TextInput
        mode="outlined"
        label="first name"
        outlineColor="black"
        activeOutlineColor="black"
        secureTextEntry={true}
        left={<TextInput.Icon name="account" />}
        style={{ marginBottom: 15, marginTop: 15 }}
        onChangeText={(firstName) => setFirstName(firstName)}
      />

      <TextInput
        mode="outlined"
        label="last name"
        outlineColor="black"
        activeOutlineColor="black"
        secureTextEntry={true}
        left={<TextInput.Icon name="account" />}
        style={{ marginBottom: 15 }}
        onChangeText={(lastName) => setLastName(lastName)}
      />

      <TextInput
        mode="outlined"
        label="email"
        outlineColor="black"
        activeOutlineColor="black"
        style={{ marginBottom: 15 }}
        left={<TextInput.Icon name="email" />}
        onChangeText={(signupEmail) => setSignupEmail(signupEmail)}
      />

      <TextInput
        mode="outlined"
        label="password"
        outlineColor="black"
        activeOutlineColor="black"
        secureTextEntry={true}
        left={<TextInput.Icon name="eye" />}
        style={{ marginBottom: 15 }}
        onChangeText={(signupPassword) => setSignupPassword(signupPassword)}
      />

      <Button
        mode="contained"
        color="black"
        loading={loading}
        style={{ marginTop: 15 }}
        uppercase={false}
        onPress={async () => {
          setLoading(true);
          await signup(signupEmail, signupPassword);
          setLoading(false);
        }}
      >
        <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>login</Text>
      </Button>
    </Screen>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: "black",
    fontFamily: "Axiforma-Regular",
    borderRadius: 10,
    padding: 20,
    color: "white",
    marginTop: 15,
  },
});
