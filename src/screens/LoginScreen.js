import { Button, TextInput } from "react-native-paper";
import React, { useState, useContext } from "react";
import { StyleSheet, Text, TextInputComponent, View } from "react-native";

import Screen from "../components/Screen";

import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      let user = await signInWithEmailAndPassword(auth, email, password);
      console.log("below is the signed in user");
      console.log(user);

      if (user.user.emailVerified) {
        navigation.navigate("Home Screen");
      } else {
        alert("Please verify email");
      }
      setLoading(false);
    } catch (e) {
      alert(e.message);
      setLoading(false);
    }
  };

  return (
    <Screen>
      <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 40 }}>login</Text>

      <TextInput
        mode="outlined"
        label="email"
        outlineColor="black"
        activeOutlineColor="black"
        style={{ marginBottom: 15, marginTop: 15 }}
        left={<TextInput.Icon name="email" />}
        onChangeText={(email) => setEmail(email)}
      />

      <TextInput
        mode="outlined"
        label="password"
        outlineColor="black"
        activeOutlineColor="black"
        secureTextEntry={true}
        left={<TextInput.Icon name="eye" />}
        onChangeText={(password) => setPassword(password)}
      />

      <Button
        mode="contained"
        color="black"
        loading={loading}
        style={{ marginTop: 20 }}
        uppercase={false}
        onPress={async () => {
          setLoading(true);
          await login();
        }}
      >
        <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>login</Text>
      </Button>
    </Screen>
  );
};

export default LoginScreen;

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
